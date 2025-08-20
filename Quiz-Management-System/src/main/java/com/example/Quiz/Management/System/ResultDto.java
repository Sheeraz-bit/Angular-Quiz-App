package com.example.Quiz.Management.System;

public class ResultDto {
    private Long userId;
    private Integer score;

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
}