package com.hiren.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hiren.customer.dao.CustomerDao;
import com.hiren.customer.model.Customer;


@Service
public class CustomerServiceImpl implements CustomerService {

	 
	@Autowired
	CustomerDao customerDao;
	
	@Override
	@Transactional
	public void saveCustomer(Customer customer) {
		customerDao.saveCustomer(customer);
	}

	@Override
	@Transactional
	public Customer getCustomerById(int customerId) {
		return customerDao.getCustomerById(customerId);
	}

}
