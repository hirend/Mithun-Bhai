package com.hiren.users.dao;

import java.util.List;

import com.hiren.users.model.User;

public interface UserDao {

	User findByUserName(String username);
	List<String> getAllRoles();
	List<String> getUsersBasedOnRole(String roleName);
	public String[] getAllCeoEmailAddresses();

}