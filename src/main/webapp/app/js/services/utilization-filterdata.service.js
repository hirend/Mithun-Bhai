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

angular.module('UtilizationModule').factory('utilizationFilterDataSvc', utilizationFilterDataSvc);

utilizationFilterDataSvc.$inject = ['$http', 'utils'];

function utilizationFilterDataSvc($http, utils) {

    const OLDEST_SESSION_DATE = utils.vitalityRoot() + '/utilization/api/sessionDateRange';
    const ALL_ENVIRONMENTS_URL = utils.vitalityRoot() + '/config/environment/all';
    const ALL_APPLICATIONS_URL = utils.vitalityRoot() + '/utilization/api/allApplications';
    const ALL_USERS_URL = utils.vitalityRoot() + '/utilization/api/allUsers';

    return {
        getOldestSessionDate: getSessionDateRange,
        getAllEnvironments: getAllEnvironments,
        getAllApplications: getAllApplications,
        getAllUsers: getAllUsers
    };

    function getSessionDateRange() {

        return $http.get(OLDEST_SESSION_DATE)
            .then(getSessionDateRangeComplete)
            .catch(getSessionDateRangeFailed);

        function getSessionDateRangeComplete(response) {
            var data = response.data;
            if(!utils.isUndefinedOrNull(data)) {
                return data;
            }
        }

        function getSessionDateRangeFailed(error) {
            console.error('Failed to get all session date range : ' + error.data);
        }
    }

    function getAllEnvironments() {
        var allEnvironments = [];

        return $http.get(ALL_ENVIRONMENTS_URL)
            .then(getAllEnvironmentsComplete)
            .catch(getAllEnvironmentsFailed);

        function getAllEnvironmentsComplete(response) {
            var rows = response.data.rows;
            if(!utils.isUndefinedOrNull(rows)) {
                angular.forEach(rows,function(row){
                    var environment = {}
                     environment["label"] = row.environmentName;
                    allEnvironments.push(environment);
                })
            }
            return allEnvironments;
        }

        function getAllEnvironmentsFailed(error) {
            console.error('Failed to get all environments: ' + error.data);
            return allEnvironments;
        }
    }

    function getAllApplications() {
        var allApplications = [];

        return $http.get(ALL_APPLICATIONS_URL)
            .then(getAllApplicationsComplete)
            .catch(getAllApplicationsFailed);

        function getAllApplicationsComplete(response) {
            var rows = response.data.rows;
            if(!utils.isUndefinedOrNull(rows)) {
                angular.forEach(rows,function(row){
                    var application = {}
                    application["label"] = row;
                    allApplications.push(application);
                })
            }
            return allApplications;
        }

        function getAllApplicationsFailed(error) {
            console.error('Failed to get all applications: ' + error.data);
            return allApplications;
        }
    }

    function getAllUsers() {
        var allUsers = [];

        return $http.get(ALL_USERS_URL)
            .then(getAllUsersComplete)
            .catch(getAllUsersFailed);

        function getAllUsersComplete(response) {
            var rows = response.data.rows;
            if(!utils.isUndefinedOrNull(rows)) {
                angular.forEach(rows,function(row){
                    var user = {}
                    user["label"] = row;
                    allUsers.push(user);
                })
            }
            return allUsers;
        }

        function getAllUsersFailed(error) {
            console.error('Failed to get all users: ' + error.data);
            return allUsers;
        }
    }


}