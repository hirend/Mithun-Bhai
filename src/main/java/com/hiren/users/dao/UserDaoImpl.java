package com.hiren.users.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hiren.users.model.User;

@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	@PersistenceContext
    private EntityManager entityManager;

	@Override
	public User findByUserName(String username) {		

		TypedQuery<User> q = entityManager.createQuery("from User where username = :username",User.class);
		q.setParameter("username", username);
		try {
            return q.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }

	}
	
	@Override
	public List<String> getAllRoles() {		

		TypedQuery<String> q = entityManager.createQuery("select distinct role from UserRole",String.class);				
        return q.getResultList();      
	}

	@Override
	public List<String> getUsersBasedOnRole(String roleName) {	 	

		TypedQuery<String> q = entityManager.createQuery("select r.user.username from UserRole r where r.role = :roleName",String.class);	
		q.setParameter("roleName", roleName);
        return q.getResultList();      
	}
	
	@Override
	public String[] getAllCeoEmailAddresses() {		
		
		TypedQuery<User> q = entityManager.createQuery("select r.user from  UserRole r where r.role = :ceoRole",User.class);	
		q.setParameter("ceoRole", "ROLE_CEO");
        List<User> ceos =  q.getResultList();
        String[] emailAddresses = new String[ceos.size()];
        
        int count = 0;
        for (User ceo : ceos) {
        	emailAddresses[count] = ceo.getEmail();   
        	count++;
        }
        return emailAddresses;
	}
}