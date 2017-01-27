/*
 * Copyright (c) 2016 Vital Images, Inc. All Rights Reserved.
 *
 * This is UNPUBLISHED PROPRIETARY SOURCE CODE of Vital Images, Inc.;
 * the contents of this file may not be disclosed to third parties,
 * copied or duplicated in any form, in whole or in part, without the
 * prior written permission of Vital Images, Inc.
 *
 * RESTRICTED RIGHTS LEGEND:
 * Use, duplication or disclosure by the Government is subject to
 * restrictions as set forth in subdivision (c)(1)(ii) of the Rights
 * in Technical Data and Computer Software clause at DFARS 252.227-7013,
 * and/or in similar or successor clauses in the FAR, DOD or NASA FAR
 * Supplement. Unpublished rights reserved under the Copyright Laws of
 * the United States.
 */

/**
 * Created by hdeveliya on 5/11/2016.
 */
(function() {
var module = angular.module('UtilizationModule');

module.controller('UtilizationOverViewController', UtilizationOverViewController);

UtilizationOverViewController.$inject = [
    '$scope',
    'utils',
    'utilizationKpiDataSvc'
];

function UtilizationOverViewController($scope,utils,utilizationKpiDataSvc) {

    var vm = this;

    vm.dailyMetricsKpi = {};
    vm.sessionVolumeKpi = {};
    var allZeroFlag = true;

    var layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        },
        plot_bgcolor: '#f1f0f0',
        hovermode: 'closest',
        xaxis: {
            autorange: true,
            showgrid: true,
            zeroline: true,
            showline: true,
            autotick: true,
            ticks: '',
            showticklabels: false
        },
        yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: true,
            showline: true,
            autotick: true,
            ticks: '',
            showticklabels: false,
            range: ''
        }
    }
    var chart = {
        x: [],
        y: [],
        fill: 'tozeroy',
        fillcolor: '#C1D6E7',
        opacity: '0.1',
        type: 'scatter',
        mode: 'lines+markers'
    };
    unHideKpiForVAEnvironment();
    function unHideKpiForVAEnvironment() {
        vm.isVA = true;
        vm.dashboardKpiClass = "col-xs-8";
        vm.uniqueUserClass = "col-xs-2";
        vm.maxConClass = "col-xs-2";
    }
    function updateUtilizationKpiData(){
        var overViewData = utilizationKpiDataSvc.getUtilizationOverview();
        if(!utils.isUndefinedOrNull(overViewData.metrics)) {
            vm.dailyMetricsKpi = overViewData.metrics;
        }else {
            vm.dailyMetricsKpi = {};
        }
        unHideKpiForVAEnvironment();
        if(!utils.isUndefinedOrNull(overViewData.isAnyEnvironmentOfTypeVA)) {
            if(!overViewData.isAnyEnvironmentOfTypeVA) {
                vm.isVA = false;
                vm.dashboardKpiClass = "col-xs-12";
                vm.uniqueUserClass = "col-xs-3";
                vm.maxConClass = "col-xs-3";
            }
        }

        if(!utils.isUndefinedOrNull(overViewData.sessionVolume)) {
            vm.sessionVolumeKpi = overViewData.sessionVolume;
        }else {
            vm.sessionVolumeKpi = {};
        }
        updateVisualizationChart();
    };

    utilizationKpiDataSvc.registerOverviewCallback(updateUtilizationKpiData);

    function updateVisualizationChart() {

        var historicalData = vm.sessionVolumeKpi.historicalData;
        var xValues = [];
        var yValues = [];
        var allZeroFlag = true;
        var hoverOverText = '';
        if(!utils.isUndefinedOrNull(historicalData)) {
            var dataUnit = historicalData.dataUnit;
            var xFormat = '';
            if(dataUnit=='HOUR') {
                xFormat = "HH";
                hoverOverText = 'Hour';
            }else if(dataUnit=='DAY') {
                xFormat = "DD-MMM-YYYY";
                hoverOverText = 'Day';
            }else if(dataUnit=='MONTH') {
                xFormat = "MMM-YYYY";
                hoverOverText = 'Month';
            }

            var sessionVolumeData = historicalData.data;
            angular.forEach(sessionVolumeData, function (data) {
                try {

                    var formattedDate = moment.utc(data.timestamp).format(xFormat);
                    xValues.push(hoverOverText+': '+formattedDate);
                    yValues.push(data.totalVolumes);
                    if(allZeroFlag && data.totalVolumes!=0) {
                        allZeroFlag=false;
                    }
                } catch (error) {
                    console.error('Session volume data date is not valid ' + data.timestamp);
                }
            });
        }
        chart.x = xValues;
        chart.y = yValues;
        if(allZeroFlag){
            layout.yaxis.autorange = false;
            layout.yaxis.range = [-1,100];
        }else {
            layout.yaxis.autorange = true;
            layout.yaxis.range = '';
        }

        var data = [chart];
        Plotly.newPlot('visualizationChart', data, layout, {displayModeBar: false});
    }
    setOverViewSectionToolTip();
    function setOverViewSectionToolTip() {
        vm.totalSessionTooltip = 'Total number of session opened for the filters selected.';
        vm.dailyAvgTooltip = 'Average number of session opened per day for the filters selected .';
        vm.yearlyAvgTooltip = 'Average number of session opened per day for current year.';

        vm.numUniqueUsersTooltip = 'Number of distinct users that have opened a session in a Vitrea application.';
        vm.numUniqueApplicationsTooltip = 'Number of distinct Vitrea applications that have used to open a session.';
        vm.avgSessionsPerUserTooltip = 'Number of distinct sessions opened in a Vitrea application per user.';
        vm.avgSessionDurationMinutesTooltip = 'Duration (time between Session Start Date and Session End Date) per session opened by a Vitrea application.';
        vm.maxConcurrentUsersTooltip = 'Maximum number of VitreaAdvanced or VitreaView sessions being used at one time.';
        vm.numConcurrentUsersLimitReachedTooltip = 'Daily Average of the count of instances where no Advanced sessions are available because the environment has reached the maximum number of concurrent Advanced sessions it can have open at one time.';
        vm.avgConcurrentUsersLimitedReachedDurationMinutesTooltip = 'Average duration, in minutes, where all available Advanced sessions being used at one time.';

        $('[data-toggle=tooltip]').hover(function(){
            // on mouseenter
            $(this).tooltip('show');
        }, function(){
            // on mouseleave
            $(this).tooltip('hide');
        });

    }
};

}());