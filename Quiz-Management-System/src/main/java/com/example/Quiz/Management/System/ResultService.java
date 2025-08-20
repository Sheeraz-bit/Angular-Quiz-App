package com.example.Quiz.Management.System;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;

    public Result saveResult(Result result) {
        return resultRepository.save(result);
    }
    
    // get results for a specific user
    public List<Result> getResultsByUserId(Long userId) {
        System.out.println("Getting results for user: " + userId);
        return resultRepository.findByUserIdOrderBySubmittedAtDesc(userId);
    }
    
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
}
