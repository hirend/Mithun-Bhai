<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
		<link href="<c:url value='/static/css/Header.css' />" rel="stylesheet"></link>

		<script src="<c:url value='/app/lib/angular/angular.min.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/lib/jquery/dist/jquery.min.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/lib/bootstrap/dist/js/bootstrap.min.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/lib/moment/moment.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/lib/angular-bootstrap/ui-bootstrap.min.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/lib/angular-bootstrap/ui-bootstrap-tpls.min.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/js/modules/aeroline.module.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/js/services/utils.js' />" type="text/javascript"></script>
		<script src="<c:url value='/app/js/controllers/create-customer.controller.js' />" type="text/javascript"></script>
				      	
      	
      	<link rel="stylesheet" href="./app/lib/font-awesome/css/font-awesome.css">
      	<link rel="stylesheet" href="./app/lib/bootstrap/dist/css/bootstrap.min.css">
      	<link rel="stylesheet" href="./app/css/createCustomer.css">      	
</head>
<body>
	<c:import url="header.jsp"></c:import> 
	<br />
      <div ng-app = "AerolineModule" class="container" ng-controller="CreateCustomerController as ccCtrl">
         <form ng-submit="ccCtrl.submitCustomerForm()" role="form" name="customerForm">
            <fieldset class="text-center" style="float: center; background-color:#dddddd;">
               <label for="authorized" class="control-label">Customer Form</label>
            </fieldset>
            <fieldset>
               <!--Name Area and City Section  -->
               <div class="row">
                  <div class="col-sm-6" ng-class="{'has-error': customerForm.customerName.$touched && customerForm.customerName.$error.required , 'has-success': customerForm.customerName.$valid }">
                     <div class="row">
                        <label for="customerName" class="col-sm-4 control-label">Customer Name</label>
                        <div class="col-sm-8">
                           <input type="text" id="customerName" name="customerName" class="form-control" ng-model="customerName" placeholder="Enter Customer Name" required />
                        </div>
                     </div>
                  </div>
                  <div class="col-sm-3" ng-class="{'has-error': customerForm.areaName.$touched && customerForm.areaName.$error.required ,  'has-success': customerForm.areaName.$valid}">
                     <div class="row">
                        <label for=" areaName" class="col-sm-3 control-label">
                        Area
                        </label>
                        <div class="col-sm-9">
                           <input type="text" id="areaName" name="areaName" class="form-control" ng-model="areaName" placeholder="Enter Area Name" required />
                        </div>
                     </div>
                  </div>
                  <div class="col-sm-3" ng-class="{'has-error': customerForm.selectCity.$touched && customerForm.selectCity.$error.required ,  'has-success': customerForm.selectCity.$valid}">
                     <div class="row">
                        <label for=" CityName" class="col-sm-3 control-label">
                        City
                        </label>
                        <div class="col-sm-9" >
                           <select id="selectCity" name="selectCity" ng-model="selectedCity" class="selectpicker form-control" required>
                              <option value="" disabled selected>Select City</option>
                              <option ng-repeat="c in ccCtrl.cities" value="{{c.city}}">{{c.city}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-sm-6">
                     <div class="row">
                        <div class="col-sm-8 col-sm-offset-4">
                           <span class="help-block" ng-show="customerForm.customerName.$touched && customerForm.customerName.$error.required">Please enter Customer Name.</span>
                        </div>
                     </div>
                  </div>
                  <div class="col-sm-3">
                     <div class="row">
                        <div class="col-sm-9 col-sm-offset-3">
                           <span class="help-block" ng-show="customerForm.areaName.$touched && customerForm.areaName.$error.required">Please enter Area Name.</span>
                        </div>
                     </div>
                  </div>
                  <div class="col-sm-3">
                     <div class="row">
                        <div class="col-sm-9 col-sm-offset-3">
                           <span class="help-block" ng-show="customerForm.selectCity.$touched && customerForm.selectCity.$error.required">Please select City.</span>
                        </div>
                     </div>
                  </div>
               </div>
               <!--Address Section  -->
               <div class="row top1" ng-class="{'has-error': customerForm.fullAddress.$touched && customerForm.fullAddress.$error.required , 'has-success': customerForm.fullAddress.$valid }">
                  <label for="fullAddress" class="col-sm-2 control-label">Full Address</label>
                  <div class="col-sm-10">
                     <input type="text" id="fullAddress" name="fullAddress" class="form-control" ng-model="fullAddress" placeholder="Enter Full Customer Address" required />
                  </div>
               </div>
               <div class="row">
                  <div class="col-sm-10 col-sm-offset-2">
                     <span class="help-block" ng-show="customerForm.fullAddress.$touched && customerForm.fullAddress.$error.required">Please enter Customer Full Address.</span>
                  </div>
               </div>
               <!--Contact Section  -->
               <div class="row top1">
                  <div class="col-sm-2">
                     <label for=" contactName" class="control-label">
                     Contact Numbers
                     </label>
                  </div>
                  <div class="col-sm-10">
                     <div  data-ng-repeat="contact in ccCtrl.contacts" ng-class="{top1: $first == false}" class="control-label">
                        <div class="row">
                           <div class="col-sm-2">
                              <select class="selectpicker form-control">
                                 <option>Owner</option>
                                 <option>Calling</option>
                              </select>
                           </div>
                           <div class="col-sm-4" ng-class="{'has-error': customerForm.contactName{{contact.id}}.$touched && customerForm.contactName{{contact.id}}.$error.required ,  'has-success': customerForm.contactName{{contact.id}}.$valid}">
                              <input name = "contactName{{contact.id}}" type="text" ng-model="contact.name" class="form-control" name="" placeholder="Enter name" required>
                           </div>
                           <div class="col-sm-4" ng-class="{'has-error': customerForm.contactNumber{{contact.id}}.$touched && customerForm.contactNumber{{contact.id}}.$error.required ,  'has-success': customerForm.contactNumber{{contact.id}}.$valid}">
                              <input name = "contactNumber{{contact.id}}" type="number" ng-model="contact.number" class="form-control" name="" placeholder="Enter contact number" required>
                           </div>
                           <div class="col-sm-2">
                              <button class="btn btn-success btn-add" ng-show="$last == true" ng-click="ccCtrl.addNewContact()" type="button">
                              <span class="glyphicon glyphicon-plus"></span>
                              </button>
                              <button class="btn btn-danger btn-remove" ng-show="$last == false" ng-click="ccCtrl.removeContact()" type="button">
                              <span class="glyphicon glyphicon-minus"></span>
                              </button>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col-sm-4 col-sm-offset-2">
                              <span class="help-block" ng-show="customerForm.contactName{{contact.id}}.$touched && customerForm.contactName{{contact.id}}.$error.required">Please enter Contact Name.</span>
                           </div>
                           <div class="col-sm-4">
                              <span class="help-block" ng-show="customerForm.contactNumber{{contact.id}}.$touched && customerForm.contactNumber{{contact.id}}.$error.required">Please enter Contact Number.</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!--Email Section  -->
               <div class="row top1" ng-class="{'has-error': customerForm.emailAddress.$touched && customerForm.emailAddress.$error.required , 'has-success': customerForm.emailAddress.$valid }">
                  <label for="emailAddress" class="col-sm-2 control-label">Full Address</label>
                  <div class="col-sm-6">
                     <input type="email" id="emailAddress" name="emailAddress" class="form-control" ng-model="emailAddress" placeholder="Enter Email Address" required />
                  </div>
               </div>
               <div class="row">
                  <div class="col-sm-10 col-sm-offset-2">
                     <span class="help-block" ng-show="customerForm.emailAddress.$touched && customerForm.emailAddress.$error.required">Please enter Email Address.</span>
                  </div>
               </div>
               <div class="row top1">
                  <div class="col-sm-2"> 
                     <label for="authorized" class="control-label">Authorized</label>
                  </div>
                  <div class="col-sm-10">                        
                     <input type="checkbox" id="authorized" name="authorized" ng-model="ccCtrl.authorized">
                  </div>
               </div>
            </fieldset>
            <fieldset>
               <div class="row top1">
                  <div class="col-sm-6">
                     <div class="row">
                        <div class="col-sm-4"> 
                           <label for="nextOrderDate" class="control-label">Next Order</label>
                        </div>
                        <div class="col-sm-3">
                           <div id = "nextOrderDate" class="date-selection-field thin-gray-border" ng-class="{'thin-red-border': ccCtrl.isNextOrderDateInvalid()}">
                              <input id="nextOrderDate" type="text" placeholder="mm/dd/yyyy" size="7" ng-model="ccCtrl.nextOrderDate" ng-change="ccCtrl.nextOrderDateChanged()"
                                 uib-datepicker-popup="MM/dd/yyyy" is-open="ccCtrl.isNextOrderDatePickerOpen"
                                 datepicker-append-to-body="true" datepicker-options="ccCtrl.dateOptions" show-button-bar="false" />
                              <button class="reset-button" type="button" ng-click="ccCtrl.openNextOrderDatePicker()" style="padding-right: 5px;"><i class="fa fa-calendar"></i></button>
                           </div>
                        </div>
                        <div class="col-sm-5"> 
                           <span ng-class="ccCtrl.nextOrderClass">{{ccCtrl.nextOrderMsg}}</span>
                        </div>
                     </div>
                  </div>
                  <div class="col-sm-6">
                     <div class="row">
                        <div class="col-sm-3"> 
                           <label for="nextPaymentDate" class="control-label">Next Payment</label>
                        </div>
                        <div class="col-sm-3">
                           <div id = "nextPaymentDate" class="date-selection-field thin-gray-border" ng-class="{'thin-red-border': ccCtrl.isNextPaymentDateInvalid()}">
                              <input id="nextPaymentDate" type="text" placeholder="mm/dd/yyyy" size="7" ng-model="ccCtrl.nextPaymentDate" ng-change="ccCtrl.nextPaymentDateChanged()"
                                 uib-datepicker-popup="MM/dd/yyyy" is-open="ccCtrl.isNextPaymentDatePickerOpen"
                                 datepicker-append-to-body="true" datepicker-options="ccCtrl.dateOptions" show-button-bar="false" />
                              <button class="reset-button" type="button" ng-click="ccCtrl.openNextPaymentDatePicker()" style="padding-right: 5px;"><i class="fa fa-calendar"></i></button>
                           </div>
                        </div>
                        <div class="col-sm-6"> 
                           <span ng-class="ccCtrl.nextPaymentClass">{{ccCtrl.nextPaymentMsg}}</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-sm-6">
                     <div class="row">
                        <div class="col-sm-8 col-sm-offset-4"> 
                           <span class="help-block" ng-show="ccCtrl.isNextOrderDateInvalid()">Next Order Date is invalid.</span>
                        </div>
                     </div>
                  </div>
                  <div class="col-sm-6">
                     <div class="row">
                        <div class="col-sm-9 col-sm-offset-3"> 
                           <span class="help-block" ng-show="ccCtrl.isNextPaymentDateInvalid()">Next Payment Date is invalid.</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row top2">
                  <div class="col-sm-2">
                     <label for="assignedTo" class="control-label">Assigned To</label>
                  </div>
                  <div class="col-sm-3">
                     <select id="role" name="role" ng-model="role" class="selectpicker form-control">
                        <option value="" disabled selected>Select Role</option>
                        <option ng-repeat="r in ccCtrl.roles" value="{{r.name}}">{{r.name}}</option>
                     </select>
                  </div>
                  <div class="col-sm-3 col-sm-offset-1">
                     <select id="user" name="user" ng-model="user" class="selectpicker form-control">
                        <option value="" disabled selected>Select User</option>
                        <option ng-repeat="u in ccCtrl.users" value="{{u.name}}">{{u.name}}</option>
                     </select>
                  </div>
               </div>
               <div class="row top1">
                  <div class="col-sm-2">
                     <label for="comment" class="control-label">Comment</label>
                  </div>
                  <div class="col-sm-10" ng-class="{'has-error': customerForm.comment.$touched && customerForm.comment.$error.required ,  'has-success': customerForm.comment.$valid}">
                     <textarea class="form-control" rows="5" ng-model="comment" name="comment" id="comment" required></textarea>
                  </div>
               </div>
               <div class="row">
                  <div class="col-sm-10 col-sm-offset-2">
                     <span class="help-block" ng-show="customerForm.comment.$touched && customerForm.comment.$error.required">Please enter Comment for your change.</span>
                  </div>
               </div>
            </fieldset>
            <input type="submit" value="Save" class="btn btn-primary top3" />
            <input type="button" value="Reset" class="btn top3" />
         </form>
      </div>

</body>
</html>