package com.hiren.users.service;

import java.util.List;

import com.hiren.users.model.User;

public interface UserService {
	
	public List<String> getAllRoles();
	public List<String> getUsersBasedOnRole(String roleName);

}
