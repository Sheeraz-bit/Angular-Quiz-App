package com.example.Quiz.Management.System;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultValidationService {
    
    @Autowired
    private UserRepository userRepository;
    
    public void validateResult(ResultDto resultDto) {
        if (!userRepository.existsById(resultDto.getUserId())) {
            throw new IllegalArgumentException("User not found");
        }
        if (resultDto.getScore() == null || resultDto.getScore() < 0) {
            throw new IllegalArgumentException("Invalid score");
        }
    }
}
