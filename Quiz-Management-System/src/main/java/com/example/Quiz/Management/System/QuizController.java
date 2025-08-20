package com.example.Quiz.Management.System;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Get all questions
    @GetMapping("/all")
    public List<Quiz> getAllQuiz() {
        return quizService.getAllQuiz();
    }

    // prints 10 random questions
    @GetMapping("/start")
    public List<Quiz> getRandomQuiz() {
        List<Quiz> allQuestions = quizService.getAllQuiz();
        Collections.shuffle(allQuestions);
        return allQuestions.stream().limit(10).toList();
    }

    // Add a new question
    @PostMapping("/add")
    public String addQuiz(@RequestBody Quiz quiz) {
        quizService.addQuiz(quiz);
        return "Quiz added successfully!";
    }

    // Get question by ID
    @GetMapping("/{id}")
    public Quiz getQuizById(@PathVariable Long id) {
        return quizService.getQuizById(id);
    }

    // Update question
    @PutMapping("/update/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        return quizService.updateQuiz(id, quiz);
    }

    // Delete question
    @DeleteMapping("/delete/{id}")
    public void deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
    }
}
