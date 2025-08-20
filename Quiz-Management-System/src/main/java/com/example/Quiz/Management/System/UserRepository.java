package com.example.Quiz.Management.System;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	User findByEmail(String email);
	
	@Modifying
	@Query(value = "UPDATE users SET attempt = :attempted WHERE id = :userId", nativeQuery = true)
	void updateAttemptedExam(@Param("userId") Long userId, @Param("attempted") boolean attempted);
}
