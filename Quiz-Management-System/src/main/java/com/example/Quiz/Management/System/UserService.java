package com.example.Quiz.Management.System;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository uRepo;
	
	//Sign up
	public User registerUser(User user) {
		if (uRepo.findByEmail(user.getEmail()) != null) {
	        throw new RuntimeException("User already exists with this email.");
	    }
		return uRepo.save(user);
	}
	
	//Login
	public User loginUser(String email, String password) {
		User existingUser = uRepo.findByEmail(email);
		if (existingUser == null) {
	        System.out.println("Login failed: User does not exist with email " + email);
	        return null;
	    }

	    if (!existingUser.getPassword().equals(password)) {
	        System.out.println("Login failed: Incorrect password for email " + email);
	        return null;
	    }

	    System.out.println("Login successful for user: " + existingUser.getUsername());
	    return existingUser;
	}
	
	//fetch all users
	public List<User> getAllUser() {
        return uRepo.findAll();
    }
	
	//fetch user by id
    public User findById(Long id) {
        return uRepo.findById(id).orElse(null);
    }
    
    // update user exam attempt status
    public void updateAttemptedExam(Long id, boolean attempted) {
        System.out.println("Updating exam status for user: " + id);
        
        User user = uRepo.findById(id).orElse(null);
        if (user != null) {
            user.setAttemptedExam(attempted);
            uRepo.save(user); // save to database
            System.out.println("User exam status updated successfully");
        } else {
            System.out.println("User not found!");
        }
    }
		
}
