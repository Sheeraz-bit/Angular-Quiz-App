package com.example.Quiz.Management.System;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/questions")
public class QuestionController {
	@Autowired
	private QuestionRepository qRepo;
	
	@GetMapping("/random")
	public List<Question> getRandomQuestions(){
		return qRepo.getRandomQuestions();
	}
}
