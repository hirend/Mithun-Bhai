package com.hiren.users.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hiren.users.dao.UserDao;
import com.hiren.users.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Transactional
	@Override
	public List<String> getAllRoles() {		
		return userDao.getAllRoles();
	}

	@Transactional
	@Override
	public List<String> getUsersBasedOnRole(String roleName) {		
		return userDao.getUsersBasedOnRole(roleName);
	}
	
	

}
