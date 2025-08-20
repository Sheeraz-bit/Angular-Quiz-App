package com.example.Quiz.Management.System;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserIdOrderBySubmittedAtDesc(Long userId);
    
    @Query("SELECT r FROM Result r WHERE r.userId = :userId ORDER BY r.submittedAt DESC")
    List<Result> findResultsByUserIdOrderBySubmittedAtDesc(@Param("userId") Long userId);
}
