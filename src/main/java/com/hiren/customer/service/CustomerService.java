package com.hiren.customer.service;

import com.hiren.customer.model.Customer;

public interface CustomerService {
	
	public void saveCustomer(Customer customer);
	public Customer getCustomerById(int customerId);

}
