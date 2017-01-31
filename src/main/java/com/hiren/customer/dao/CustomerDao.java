package com.hiren.customer.dao;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.hiren.customer.model.Customer;
import com.hiren.customer.model.CustomerContact;
import com.hiren.customer.model.CustomerHist;
import com.hiren.users.model.User;

@Repository
public class CustomerDao {
	
	@PersistenceContext
    EntityManager entityManager;
	
	
	public void saveCustomer(Customer customer) {
		
		if(customer.getCustomerId()>0) {
			entityManager.merge(customer);
		}else {
			entityManager.persist(customer);
		}		
		
		for(CustomerContact cont : customer.getContacts()) {
			
			cont.setCustomer(customer);
			if(cont.getContactId()>0) {
				entityManager.merge(cont);
			}else {
				entityManager.persist(cont);
			}			
		}
		
		for(CustomerHist hist : customer.getHist()) {
			
			hist.setCustomer(customer);			
			if(hist.getCustomerHistId()>0) {
				entityManager.merge(hist);
			}else {
				entityManager.persist(hist);
			}
		}
	}
			
	public Customer getCustomerById(int customerId) {		

		TypedQuery<Customer> q = entityManager.createQuery("from Customer where customerId = :customerId",Customer.class);
		q.setParameter("customerId", customerId);
		
		return q.getSingleResult();						
        

	}

}
