package com.example.Quiz.Management.System;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	// Get all questions
    @GetMapping("/all")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }
    
    //Sign up
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
    	return userService.registerUser(user);
    }
    
    // user login endpoint
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginData) {
    	User userResult = userService.loginUser(loginData.getEmail(), loginData.getPassword());
    	return userResult;
    }
    
    // check if user attempted exam or not
    @GetMapping("/attempted/{id}")
    public boolean hasAttempted(@PathVariable Long id) {
    	User foundUser = userService.findById(id);
    	if (foundUser != null) {
    		return foundUser.isAttemptedExam();
    	}
    	return false;
    }
    
    
    //update attempted exam
    @PutMapping("/attempted/{id}")
    public void updateAttempted(@PathVariable Long id) {
    	userService.updateAttemptedExam(id, true);
    }
    
}
