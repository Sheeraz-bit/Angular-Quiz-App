package com.example.Quiz.Management.System;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	@Query(value = "select * from quiz_questions order by random() limit 10", nativeQuery = true)
	List<Question> getRandomQuestions();
}
