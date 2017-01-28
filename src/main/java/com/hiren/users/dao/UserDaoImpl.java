package com.hiren.users.dao;

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

	public User findByUserName(String username) {		

		TypedQuery<User> q = entityManager.createQuery("from User where username = :username",User.class);
		q.setParameter("username", username);
		try {
            return q.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }

	}

}