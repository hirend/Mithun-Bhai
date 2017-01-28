package com.hiren.customer.controller;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hiren.customer.model.Customer;
import com.hiren.customer.service.CustomerService;
import com.hiren.users.model.User;

@Controller
public class CustomerController {

	@Autowired
	CustomerService customerService;
	
	@RequestMapping(value = "/createCustomer", method = RequestMethod.POST)  	
	public @ResponseBody String createCustomer(@RequestBody Customer customer) {		
		
		customerService.saveCustomer(customer);
		String ddndn = "/saveCustomer";
		ddndn = ddndn.toLowerCase();
		//return new ResponseEntity<Customer>(customer, HttpStatus.OK);
		return "/saveCustomer";
		

	}	
	
	@RequestMapping(value = "/getCustomer", method = RequestMethod.GET)
    @ResponseBody	
	public Customer getCustomer() {

		Customer cus = new Customer();
		User user = new User();
		user.setEnabled(true);
		user.setUsername("mkyong");
		
		cus.setName("Mithun");
		cus.setArea("Dange Chowk");
		cus.setCity("Pune");
		cus.setEmail("hdeveliya483@gmail.com");
		cus.setAuthorized(true);
		cus.setNextOrderDate(new Date());
		cus.setNextPaymentDate(new Date());
		
		cus.setCreatedBy(user);
		cus.setModifiedBy(user);
		cus.setCreatedDate(new Date());
		cus.setModifiedDate(new Date());				
		
		return cus;
		

	}
	
	
	@RequestMapping(value = "/createCustomerPage", method = RequestMethod.GET)
	public ModelAndView createCustomer() {

		ModelAndView model = new ModelAndView();	

		model.setViewName("createCustomer");
		return model;

	}
	
	@RequestMapping(value = "/viewCustomerPage", method = RequestMethod.GET)
	public ModelAndView viewCustomer() {

		ModelAndView model = new ModelAndView();	

		model.setViewName("viewCustomer");
		return model;

	}
}
