package com.example.Quiz.Management.System;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultService resultService;
    
    @Autowired
    private UserService userService;

    // exam result submission
    @PostMapping("/submit")
    public ResponseEntity<String> submitResult(@RequestBody ResultDto resultDto) {
        System.out.println("Student submitted exam result");
        
        // check if user exists or not
        if (resultDto.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is null");
        }
        
        User user = userService.findById(resultDto.getUserId());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        Result result = new Result();
        result.setScore(resultDto.getScore());
        result.setUserId(resultDto.getUserId());
        result.setSubmittedAt(java.time.LocalDateTime.now()); 
        resultService.saveResult(result);
        userService.updateAttemptedExam(resultDto.getUserId(), true);
        
        return ResponseEntity.ok("Result submitted successfully");
    }

    // get results for specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Result>> getResultsByUserId(@PathVariable Long userId) {
        System.out.println("Getting results for user: " + userId);
        
        List<Result> results = resultService.getResultsByUserId(userId);
        return ResponseEntity.ok(results);
    }

    // get all results for admin
    @GetMapping("/all")
    public ResponseEntity<List<Result>> getAllResults() {
        System.out.println("Admin is getting all results");
        List<Result> results = resultService.getAllResults();
        return ResponseEntity.ok(results);
    }
}


