package com.hiren.customer.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.hiren.customer.model.Customer;

@Repository
public class CustomerDao {
	
	@PersistenceContext
    EntityManager entityManager;
	
	
	public void saveCustomer(Customer customer) {
		
		entityManager.persist(customer);			
	}

}
