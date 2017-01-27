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

(function() {
var module = angular.module('UtilizationModule');

module.controller('UtilizationTableController', UtilizationTableController);

UtilizationTableController.$inject = [
    '$scope', '$sce', 'utils', 'utilizationKpiDataSvc'
];
function UtilizationTableController($scope,$sce,utils,utilizationKpiDataSvc) {

    var vm = this;
    var flag = 0;	 	//0-init stage,1-asc,2-desc
    var colFlag = 0; 	// 0-init stage,1-name,2-volume,3-month,4-year,5-trend

    vm.currentYear = moment().format('YYYY')
    vm.dimensionName = 'User Name';
    vm.hideApplication = false;
    vm.sort = sort;

    vm.loadUsers = function loadUsers() {
        utilizationKpiDataSvc.getUtilizationDetailFromServer('User');
        vm.dimensionName = 'User Name';
    }
    vm.loadApplications = function loadApplications() {
        utilizationKpiDataSvc.getUtilizationDetailFromServer('Application');
        vm.dimensionName = 'Application Name';
    }
    function updateUtilizationDetailData(){
        var detailData = utilizationKpiDataSvc.getUtilizationDetail();
        vm.dimensionCollection = detailData.dimension;

        var requestParam = utilizationKpiDataSvc.getRequestParam();
        var startDate = requestParam.startDate;
        var endDate = requestParam.endDate;
        vm.dateRange = moment(startDate).format('MMM DD, YYYY') +'-'+moment(endDate).format('MMM DD, YYYY');
        flag = 0;
        colFlag = 0;
    };

    utilizationKpiDataSvc.registerDetailsCallback(updateUtilizationDetailData);

    function hideUnHideApplication(){
        var overViewData = utilizationKpiDataSvc.getUtilizationOverview();
        if(!utils.isUndefinedOrNull(overViewData.isAnyEnvironmentOfTypeVA)) {
            vm.hideApplication = !overViewData.isAnyEnvironmentOfTypeVA;
            if(vm.hideApplication) {
                vm.loadUsers();
                $('#user-details-tab').click();
            }
        }
    };

    utilizationKpiDataSvc.registerOverviewCallback(hideUnHideApplication);

    function sort(colID) {
        var elems;
        switch (colID) {
            case 'col-name':
                elems = colNaturalSort(elems, colID);
                break;
            default:
                elems = colNumberSort(elems, colID);
                console.log('in default')
                break;
        }
        if(elems !== undefined && elems !== '')
            $('table#dimension_table').append($(elems));
    }

    function colNumberSort(elems, colID) {
        elems = $.makeArray($('tr:has(#'+colID+')').remove());
        if(colFlag === colID && flag !== 2){
            elems.sort(function(a, b) {
                var ax = [], bx = [];
                var s1 = $(a).find('#'+colID).text().trim();
                var s2 = $(b).find('#'+colID).text().trim();
                if(colID === 'col-trend'){// trend specific code
                    if(s1.indexOf('▼') > -1)	s1 = '-'+s1;
                    if(s2.indexOf('▼') > -1)	s2 = '-'+s2;
                    if(s1 !== '0%' )	s1 = s1.substring(0, s1.length - 2); else s1 = s1.substring(0, s1.length - 1);
                    if(s2 !== '0%' )	s2 = s2.substring(0, s2.length - 2); else s2 = s2.substring(0, s2.length - 1);
                }
                return (s1) - (s2);
            }).reverse();
            //set flag
            flag = 2;
        } else {
            elems.sort(function(a, b) {
                var ax = [], bx = [];
                var s1 = $(a).find('#'+colID).text().trim();
                var s2 = $(b).find('#'+colID).text().trim();
                if(colID === 'col-trend'){// trend specific code
                    if(s1.indexOf('▼') > -1)	s1 = '-'+s1;
                    if(s2.indexOf('▼') > -1)	s2 = '-'+s2;
                    if(s1 !== '0%' )	s1 = s1.substring(0, s1.length - 2); else s1 = s1.substring(0, s1.length - 1);
                    if(s2 !== '0%' )	s2 = s2.substring(0, s2.length - 2); else s2 = s2.substring(0, s2.length - 1);
                }
                return (s1) - (s2);
            });
            //set flag
            flag = 1;
        }
        colFlag = colID;
        return elems;
    }


    function colNaturalSort(elems, colID) {
        elems = $.makeArray($('tr:has(#'+colID+')').remove());
        if(colFlag === colID && flag !== 2){
            elems.sort(function(a, b) {
                var ax = [], bx = [];
                var s1 = $(a).find('#'+colID).text().trim();
                var s2 = $(b).find('#'+colID).text().trim();
                s1.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
                s2.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
                while(ax.length && bx.length) {
                    var an = ax.shift();
                    var bn = bx.shift();
                    var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
                    if(nn) return nn;
                }
                return ax.length - bx.length;
            }).reverse();
            flag = 2;
        } else {
            elems.sort(function(a, b) {
                var ax = [], bx = [];
                var s1 = $(a).find('#'+colID).text().trim();
                var s2 = $(b).find('#'+colID).text().trim();
                s1.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
                s2.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
                while(ax.length && bx.length) {
                    var an = ax.shift();
                    var bn = bx.shift();
                    var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
                    if(nn) return nn;
                }
                return ax.length - bx.length;
            });
            flag = 1;
        }
        colFlag = colID;
        return elems;
    }
};
}());