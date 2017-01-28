/**
 * Created by hdeveliya on 3/23/2016.
 */

(function() {
var module = angular.module('AerolineModule');

module.controller('CreateCustomerController', CreateCustomerController);

CreateCustomerController.$inject = [
    '$scope',
	'utils'
];


function CreateCustomerController($scope,utils) {
    var vm = this;	              
	var today = new Date();	
	today.setHours(0,0,0,0);
		
    vm.isNextOrderDatePickerOpen = false;
	vm.isNextPaymentDatePickerOpen = false;
	vm.nextOrderDate = today;
	vm.nextPaymentDate = today;
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
	
	vm.roles = [
        {name : "Calling"},
        {name : "Sales1"},
        {name : "MD"}
    ];
	
	vm.users = [
        {name : "Hiren"},
        {name : "Mithun"},
        {name : "Arjun"}
    ];
			 

	vm.contacts = [{id: 'contact1'}, {id: 'contact2'}];
	
	applyStatusColorForNextPayment();
	applyStatusColorForNextOrder();
  
	vm.addNewContact = function addNewContact() {
		var newItemNo = vm.contacts.length+1;
		vm.contacts.push({'id':'contact'+newItemNo});
	};
    
	vm.removeContact = function removeContact() {
		var lastItem = vm.contacts.length-1;
		vm.contacts.splice(lastItem);
	};	

	vm.isNextOrderDateInvalid = function isNextOrderDateInvalid() {
        return vm.alerts.invalidNextOrderDate;
    };
	
	vm.openNextOrderDatePicker = function openNextOrderDatePicker() {
        vm.isNextOrderDatePickerOpen = !vm.isNextOrderDatePickerOpen;        
    };
	
	vm.nextOrderDateChanged = function nextOrderDateChanged() {
        var nextOrderDate = vm.nextOrderDate;
		
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
	
	
	vm.isNextPaymentDateInvalid = function isNextPaymentDateInvalid() {
        return vm.alerts.invalidNextPaymentDate;
    };
	
	vm.openNextPaymentDatePicker = function openNextPaymentDatePicker() {
        vm.isNextPaymentDatePickerOpen = !vm.isNextPaymentDatePickerOpen;        
    };
	
	vm.nextPaymentDateChanged = function nextPaymentDateChanged() {
        var nextPaymentDate = vm.nextPaymentDate;
		
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
	
	function toDate(dateString) {
        try {
            var v = moment(dateString, "MM/DD/YYYY", true);
            return v.isValid() ? v : null;
        } catch (error) {
            return null;
        }
    }
	
	function applyStatusColorForNextPayment() {
        
		if(vm.nextPaymentDate < today) {
			vm.nextPaymentClass = 'alert alert-danger-alt';
			vm.nextPaymentMsg = 'Payment is already due !!';
		} else if(vm.nextPaymentDate > today) {
			vm.nextPaymentClass = 'alert alert-success-alt';
			vm.nextPaymentMsg = 'Relax All is Well!!';
		} else {
			vm.nextPaymentClass = 'alert alert-info-alt';
			vm.nextPaymentMsg = 'Payment due for today !!';
		}
    }

	function applyStatusColorForNextOrder() {
        
		if(vm.nextOrderDate < today) {
			vm.nextOrderClass = 'alert alert-danger-alt';
			vm.nextOrderMsg = 'Payment is already due !!';
		} else if(vm.nextOrderDate > today) {
			vm.nextOrderClass = 'alert alert-success-alt';
			vm.nextOrderMsg = 'Relax All is Well !!';
		} else {
			vm.nextOrderClass = 'alert alert-info-alt';
			vm.nextOrderMsg = 'Payment due for today !!';
		}
    } 

	vm.submitCustomerForm = function submitCustomerForm () {
		alert('form is ready to be submitted'+this);
		console.log('form is ready to be submitted'+this);
	}
};

}());