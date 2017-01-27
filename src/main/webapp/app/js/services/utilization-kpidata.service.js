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
var utilizationOverViewData = "test";
/**
 * Created by hdeveliya on 5/13/2016.
 */

angular.module('UtilizationModule').factory('utilizationKpiDataSvc', utilizationKpiDataSvc);

utilizationKpiDataSvc.$inject = ['$http', 'utils'];

function utilizationKpiDataSvc($http, utils) {

    var vm = this;
    vm.utilizationOverviewData = {};
    vm.utilizationDetailData = {};
    vm.requestParam = {};
    vm.dimensionType = "User";

    const GET_UTILIZATION_OVERVIEW_DATA = utils.vitalityRoot() + '/utilization/api/overview';
    const GET_UTILIZATION_DETAIL_DATA = utils.vitalityRoot() + '/utilization/api/details';
    const GET_LAST_REFRESHED_DATE = utils.vitalityRoot() + '/utilization/api/lastRefreshed';

    var overviewCallbacks = [];
    var detailsCallbacks = [];

    return {
        registerOverviewCallback: registerOverviewCallback,
        notifyOverviewObservers: notifyOverviewObservers,
        registerDetailsCallback: registerDetailsCallback,
        notifyDetailsObservers: notifyDetailsObservers,
        getUtilizationOverviewFromServer: getUtilizationOverviewFromServer,
        getUtilizationOverview: getUtilizationOverview,
        getUtilizationDetailFromServer: getUtilizationDetailFromServer,
        getUtilizationDetail: getUtilizationDetail,
        getLastRefreshedDate: getLastRefreshedDate,
        getRequestParam: getRequestParam
    };

    function registerOverviewCallback(callback) {
        overviewCallbacks.push(callback);
    }

    function notifyOverviewObservers() {
        angular.forEach(overviewCallbacks, function(callback){
            callback();
        });
    }

    function registerDetailsCallback(callback) {
        detailsCallbacks.push(callback);
    }

    function notifyDetailsObservers() {
        angular.forEach(detailsCallbacks, function(callback){
            callback();
        });
    }

    function getUtilizationOverviewFromServer(requestParam) {
        vm.requestParam = requestParam;
        vm.requestParam.dimensionType = vm.dimensionType;
        getUtilizationDetailFromServer(vm.dimensionType);
        var config = {
            params: vm.requestParam,
            headers : {'Accept' : 'application/json'}
        };
        return $http.get(GET_UTILIZATION_OVERVIEW_DATA,config)
            .then(getUtilizationOverviewFromServerComplete)
            .catch(getUtilizationOverviewFromServerFailed);

        function getUtilizationOverviewFromServerComplete(response) {
            var data = response.data;
            if(!utils.isUndefinedOrNull(data)) {
                vm.utilizationOverviewData = data;
                notifyOverviewObservers()
            }
        }

        function getUtilizationOverviewFromServerFailed(error) {
            console.error('Failed to get utilization overview data: ' + error.data);
        }
    }

    function getUtilizationDetailFromServer(dimensionType) {
        vm.dimensionType = dimensionType;
        vm.requestParam.dimensionType = dimensionType;
        var config = {
            params: vm.requestParam,
            headers : {'Accept' : 'application/json'}
        };
        return $http.get(GET_UTILIZATION_DETAIL_DATA,config)
            .then(getUtilizationDetailFromServerComplete)
            .catch(getUtilizationDetailFromServerFailed);

        function getUtilizationDetailFromServerComplete(response) {
            var data = response.data;
            if(!utils.isUndefinedOrNull(data)) {
                vm.utilizationDetailData = data;
                notifyDetailsObservers();
            }
        }

        function getUtilizationDetailFromServerFailed(error) {
            console.error('Failed to get utilization detail data: ' + error.data);
        }
    }

    function getUtilizationOverview() {
        return vm.utilizationOverviewData;
    }

    function getUtilizationDetail() {
        return vm.utilizationDetailData;
    }

    function getLastRefreshedDate() {

        return $http.get(GET_LAST_REFRESHED_DATE)
            .then(getLastRefreshedDateComplete)
            .catch(getLastRefreshedDateFailed);

        function getLastRefreshedDateComplete(response) {
            var data = response.data;
            if(!utils.isUndefinedOrNull(data)) {
                return data.refreshedTimestamp;
            }
        }

        function getLastRefreshedDateFailed(error) {
            console.error('Failed to get last refreshed date: ' + error.data);
        }
    }

    function getRequestParam() {
        return vm.requestParam;
    }
}