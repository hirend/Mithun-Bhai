package com.hiren.customer.dao;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();	    
	    User loggedInUser = new User(auth.getName());
	    
	    for(CustomerContact cont : customer.getContacts()) {			
			cont.setCustomer(customer);						
		}
		
		for(CustomerHist hist : customer.getHist()) {			
			hist.setCustomer(customer);
			hist.setCreatedBy(loggedInUser);
			hist.setRegDate(new Date());			
		}
	    
		if(customer.getCustomerId()>0) {
			customer.setModifiedBy(loggedInUser);
			customer.setModifiedDate(new Date());
			entityManager.merge(customer);
		}else {
			customer.setCreatedBy(loggedInUser);
			customer.setCreatedDate(new Date());
			customer.setModifiedBy(loggedInUser);
			customer.setModifiedDate(new Date());
			entityManager.persist(customer);
						
		}		
		
		
	}
			
	public Customer getCustomerById(int customerId) {		

		TypedQuery<Customer> q = entityManager.createQuery("from Customer where customerId = :customerId",Customer.class);
		q.setParameter("customerId", customerId);
		
		return q.getSingleResult();						
        

	}

}
