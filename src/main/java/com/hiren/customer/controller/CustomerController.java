package com.hiren.customer.controller;

import java.io.IOException;

import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hiren.customer.model.Customer;
import com.hiren.customer.service.CustomerService;

@Controller
public class CustomerController {

	@Autowired
	CustomerService customerService;
	
	
	/**
     * Find Customer details based on given customer id
     *     
     * @RequestParam customerId   the unique identifier of customer object
     * @response 200 application/json   successfully updated customer
     * @response 201 application/json   successfully created customer
     * @response 400 text/plain         the request body parameter customer is either absent or is not valid  
     * @response 500 text/plain         problem with connecting to database/internal server error    
     */
	@RequestMapping(value = "/createUpdateCustomer", method = RequestMethod.POST)  	
	public void createUpdateCustomer(@RequestBody Customer customer, HttpServletResponse response) throws IOException {
									
		try {
			customerService.saveCustomer(customer);	
			if(customer.getCustomerId()==0) {
				response.setStatus(HttpServletResponse.SC_CREATED);				
			}			
		} catch (OptimisticLockException ole) {
			response.sendError(HttpServletResponse.SC_CONFLICT , "Someone has updated this customer, please refresh and try again");
		}		
	}			
	
	/**
     * Find Customer details based on given customer id
     *     
     * @RequestParam customerId   the unique identifier of customer object
     * @response 200 application/json   successfully retrieved customer
     * @response 400 text/plain         the request parameter customerId is either absent or is not valid  
     * @response 500 text/plain         problem with connecting to database    
     */
	@RequestMapping(value = "/getCustomerById", method = RequestMethod.GET)
    @ResponseBody	
	public Customer getCustomerById(@RequestParam int customerId, HttpServletResponse response) throws IOException {		
		
		Customer customer = null;
		try {
			customer = customerService.getCustomerById(customerId);
		} catch(NoResultException nre) {
			response.sendError(HttpServletResponse.SC_NOT_FOUND, "No Customer found with id "+customerId);            
		} catch (PersistenceException pe) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, pe.getMessage());          
        }	
		return customer;

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
