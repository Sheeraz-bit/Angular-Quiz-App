package com.example.Quiz.Management.System;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class QuizService {
	@Autowired
	private final QuizRepository qRepo;
	
	public QuizService(QuizRepository qRepo) {
		this.qRepo = qRepo;
	}
	
	//fetch quiz by id
	public Quiz getQuizById(Long id) {
		return qRepo.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found with id " + id));
	}
	
	//fetch all quiz
	public List<Quiz> getAllQuiz(){
		return qRepo.findAll();
	}
	
	//add new quiz
	public void addQuiz(Quiz quiz) {
		qRepo.save(quiz);
	}
	
	//update a quiz
	public Quiz updateQuiz(Long id, Quiz updQuiz) {
		return qRepo.findById(id)
				.map(existQuiz -> {
	                existQuiz.setQuestion(updQuiz.getQuestion());
	                existQuiz.setOptA(updQuiz.getOptA());
	                existQuiz.setOptB(updQuiz.getOptB());
	                existQuiz.setOptC(updQuiz.getOptC());
	                existQuiz.setOptD(updQuiz.getOptD());
	                existQuiz.setAnswer(updQuiz.getAnswer());
	                return qRepo.save(existQuiz);
	            })
	            .orElseThrow(() -> new RuntimeException("Quiz not found with id " + id));
	    }

	//delete quiz by id
	public void deleteQuiz(Long id) {
		qRepo.deleteById(id);
		System.out.println("Quiz deleted successfully: " +id);
	}
}
