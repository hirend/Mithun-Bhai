
angular.module('AerolineModule').factory('customerSvc', customerSvc);

customerSvc.$inject = ['$http', 'utils'];

function customerSvc($http, utils) {

    const CREATE_UPDATE_CUSTOMER = utils.aerolineRoot() + '/createUpdateCustomer'; 
    const GET_ALL_ROLES = utils.aerolineRoot() + '/getAllRoles'; 
    const GET_USERS_BASED_ROLES = utils.aerolineRoot() + '/getUsersBasedOnRole'; 

    return {
    	createUpdateCustomer: createUpdateCustomer, 
    	getAllRoles: getAllRoles,
    	getUsersBasedOnRole: getUsersBasedOnRole
    };

    function createUpdateCustomer(customer) {

        return $http({
            	url: CREATE_UPDATE_CUSTOMER,
            	method: "POST",
            	data: customer,
            	headers: {'Content-Type': 'application/json'}
        	}).then(createUpdateCustomerComplete)
            	.catch(createUpdateCustomerFailed);

        function createUpdateCustomerComplete(response) {                    	
        	if(response.status == 200) {            	        	
            	$("#customer-success").fadeTo(2000, 500).slideUp(500, function(){
            		$("#customer-success").alert('close');
            		location.reload(); 
            	});
            }
        }

        function createUpdateCustomerFailed(error) {
            console.error('Failed to customer data : ' + error.data);
            $("#customer-failure").fadeTo(2000, 500).slideUp(500, function(){
        	    $("#customer-failure").alert('close');        	     
        	});
        }
    }
    
    function getAllRoles() {

        return $http.get(GET_ALL_ROLES)
            .then(getAllRolesComplete)
            .catch(getAllRolesFailed);

        function getAllRolesComplete(response) {
            var roles = response.data;
            if(!utils.isUndefinedOrNull(roles)) {
                return roles;
            }
        }

        function getAllRolesFailed(error) {
            console.error('Failed to get all roles: ' + error.data);
        }
    }
    
    function getUsersBasedOnRole(role) {

    	var config = {
                params: {roleName: role}               
            };
        return $http.get(GET_USERS_BASED_ROLES,config)
            .then(getLastRefreshedDateComplete)
            .catch(getLastRefreshedDateFailed);

        function getLastRefreshedDateComplete(response) {
            var users = response.data;
            if(!utils.isUndefinedOrNull(users)) {
                return users;
            }
        }

        function getLastRefreshedDateFailed(error) {
            console.error('Failed to get last refreshed date: ' + error.data);
        }
    }
}