/**
 * Created by hdeveliya on 3/23/2016.
 */

(function() {
var module = angular.module('AerolineModule');

module.controller('CreateCustomerController', CreateCustomerController);

CreateCustomerController.$inject = [
    '$scope',
	'utils',
	'customerSvc'
];


function CreateCustomerController($scope,utils,customerSvc) {
    var vm = this;	        
    vm.customerForm = {};
	var today = new Date();	
	today.setHours(0,0,0,0);
	
	vm.isLastOrderDatePickerOpen = false;
	vm.isNextPaymentDatePickerOpen = false;
	vm.isNextOrderDatePickerOpen = false;	
	vm.customerForm.lastOrderDate = today;
	vm.customerForm.nextPaymentDate = today;
	vm.customerForm.nextOrderDate = today;
	vm.alerts = {};
	
	vm.dateOptions = {
        showWeeks: false,
		minDate: today
    };
	vm.cities = [
        {city : "Pune"},
        {city : "Mumbai"},
        {city : "Kolhapur"}
    ];
	
	loadRoles();       
	
	vm.users = [];
			 

	vm.customerForm.contacts = [{id: '1'}, {id: '2'}];
	
	applyStatusColorForLastOrder();
	applyStatusColorForNextPayment();
	applyStatusColorForNextOrder();
  
	vm.addNewContact = function addNewContact() {
		var newItemNo = vm.customerForm.contacts.length+1;
		vm.customerForm.contacts.push({'id':newItemNo});
	};
    
	vm.removeContact = function removeContact() {
		var lastItem = vm.customerForm.contacts.length-1;
		vm.customerForm.contacts.splice(lastItem);
	};	

	vm.isLastOrderDateInvalid = function isLastOrderDateInvalid() {
        return vm.alerts.invalidLastOrderDate;
    };
	
	vm.openLastOrderDatePicker = function openLastOrderDatePicker() {
        vm.isLastOrderDatePickerOpen = !vm.isLastOrderDatePickerOpen;        
    };
	
	vm.lastOrderDateChanged = function lastOrderDateChanged() {
        var lastOrderDate = vm.customerForm.lastOrderDate;
		
        if(utils.isUndefinedOrNull(lastOrderDate)) {
            vm.alerts.invalidLastOrderDate = true;
            return;
        } else if (lastOrderDate != null && !(lastOrderDate instanceof Date)) {
            lastOrderDate = toDate(lastOrderDate);
            if(lastOrderDate == null) {
                vm.alerts.invalidLastOrderDate = true;
                return;
            }
        }        
        vm.alerts.invalidLastOrderDate = false; 		
		applyStatusColorForLastOrder();
    };
	
	
	vm.isNextPaymentDateInvalid = function isNextPaymentDateInvalid() {
        return vm.alerts.invalidNextPaymentDate;
    };
	
	vm.openNextPaymentDatePicker = function openNextPaymentDatePicker() {
        vm.isNextPaymentDatePickerOpen = !vm.isNextPaymentDatePickerOpen;        
    };
	
	vm.nextPaymentDateChanged = function nextPaymentDateChanged() {
        var nextPaymentDate = vm.customerForm.nextPaymentDate;
		
        if(utils.isUndefinedOrNull(nextPaymentDate)) {
            vm.alerts.invalidNextPaymentDate = true;
            return;
        } else if (nextPaymentDate != null && !(nextPaymentDate instanceof Date)) {
            nextPaymentDate = toDate(nextPaymentDate);
            if(nextPaymentDate == null) {
                vm.alerts.invalidNextPaymentDate = true;
                return;
            }
        }        
        vm.alerts.invalidNextPaymentDate = false; 
		applyStatusColorForNextPayment();
    };
	
    vm.isNextOrderDateInvalid = function isNextOrderDateInvalid() {
        return vm.alerts.invalidNextOrderDate;
    };
	
	vm.openNextOrderDatePicker = function openNextOrderDatePicker() {
        vm.isNextOrderDatePickerOpen = !vm.isNextOrderDatePickerOpen;        
    };
	
	vm.nextOrderDateChanged = function nextOrderDateChanged() {
        var nextOrderDate = vm.customerForm.nextOrderDate;
		
        if(utils.isUndefinedOrNull(nextOrderDate)) {
            vm.alerts.invalidNextOrderDate = true;
            return;
        } else if (nextOrderDate != null && !(nextOrderDate instanceof Date)) {
            nextOrderDate = toDate(nextOrderDate);
            if(nextOrderDate == null) {
                vm.alerts.invalidNextOrderDate = true;
                return;
            }
        }        
        vm.alerts.invalidNextOrderDate = false; 		
		applyStatusColorForNextOrder();
    };
    
	function toDate(dateString) {
        try {
            var v = moment(dateString, "MM/DD/YYYY", true);
            return v.isValid() ? v : null;
        } catch (error) {
            return null;
        }
    }
	
	function applyStatusColorForLastOrder() {
        
		if(vm.customerForm.lastOrderDate < today) {
			vm.lastOrderClass = 'alert alert-danger-alt';
			vm.lastOrderMsg = 'Last Order is already due !!';
		} else if(vm.customerForm.lastOrderDate > today) {
			vm.lastOrderClass = 'alert alert-success-alt';
			vm.lastOrderMsg = 'Relax All is Well !!';
		} else {
			vm.lastOrderClass = 'alert alert-info-alt';
			vm.lastOrderMsg = 'Last Order due for today !!';
		}
    } 

	function applyStatusColorForNextPayment() {
        
		if(vm.customerForm.nextPaymentDate < today) {
			vm.nextPaymentClass = 'alert alert-danger-alt';
			vm.nextPaymentMsg = 'Payment is already due !!';
		} else if(vm.customerForm.nextPaymentDate > today) {
			vm.nextPaymentClass = 'alert alert-success-alt';
			vm.nextPaymentMsg = 'Relax All is Well!!';
		} else {
			vm.nextPaymentClass = 'alert alert-info-alt';
			vm.nextPaymentMsg = 'Payment due for today !!';
		}
    }

	function applyStatusColorForNextOrder() {
        
		if(vm.customerForm.nextOrderDate < today) {
			vm.nextOrderClass = 'alert alert-danger-alt';
			vm.nextOrderMsg = 'Next Order is already due !!';
		} else if(vm.customerForm.nextOrderDate > today) {
			vm.nextOrderClass = 'alert alert-success-alt';
			vm.nextOrderMsg = 'Relax All is Well !!';
		} else {
			vm.nextOrderClass = 'alert alert-info-alt';
			vm.nextOrderMsg = 'Next Order due for today !!';
		}
    } 

	vm.submitCustomerForm = function submitCustomerForm () {
		if(utils.isUndefinedOrNull(vm.customerForm.customerId)) {
			var hist = '<dl><dt>Action</dt><dd>Created</dd><dt>Customer Name</dt><dd>';
			hist = hist+vm.customerForm.name+'</dd><dt>Area</dt><dd>';
			hist = hist+vm.customerForm.area+'</dd><dt>City</dt><dd>';
			hist = hist+vm.customerForm.city+'</dd><dt>Full Address</dt><dd>';
			hist = hist+vm.customerForm.address+'</dd><dt>Contact Numbers</dt>';
			angular.forEach(vm.customerForm.contacts, function(contact) {
				  delete contact.id
				  hist = hist+'<dd>'+contact.type+'&nbsp;'+contact.name+'&nbsp;'+contact.number+'</dd>'
				}); 
			hist = hist+'<dt>Email Address</dt><dd>';
			hist = hist+vm.customerForm.email+'</dd><dt>Authorized</dt><dd>';
			hist = hist+vm.customerForm.authorized+'</dd><dt>Last Order</dt><dd>';
			hist = hist+vm.customerForm.lastOrderDate+'</dd><dt>Next Payment</dt><dd>';
			hist = hist+vm.customerForm.nextPaymentDate+'</dd><dt>Next Order</dt><dd>';
			hist = hist+vm.customerForm.nextOrderDate+'</dd><dt>Assigned To</dt><dd>';
			hist = hist+vm.customerForm.assignedTo.username+'</dd><dt>Comment</dt><dd>';
			hist = hist+vm.comment+'</dd></dl>';
			
			vm.customerForm.hist = [{description:hist}]			
		}
		customerSvc.createUpdateCustomer(vm.customerForm);		
	}
	
	function loadRoles() {		
		customerSvc.getAllRoles()
	    .then(function(roles) {
	        vm.roles = roles;        
	    });
	}
	
	vm.loadUsersBasedOnSelectedRole = function loadUsersBasedOnSelectedRole(role) {		
		customerSvc.getUsersBasedOnRole(role)
	    .then(function(users) {
	        vm.users = users;        
	    });
	}
	
	
};

}());