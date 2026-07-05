package com.project.quizapp.controller;

import com.project.quizapp.dto.QuizDTO;
import com.project.quizapp.model.QuestionWrapper;
import com.project.quizapp.model.Response;
import com.project.quizapp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;
import com.project.quizapp.dto.AttemptHistoryDTO;
import com.project.quizapp.dto.StatisticsDTO;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestParam String category,
                                             @RequestParam int numQ,
                                             @RequestParam String title){

        return quizService.createQuiz(category,numQ,title);

    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<Integer> submitQuiz(
            @PathVariable Integer id,
            @RequestBody List<Response> responses,
            Authentication authentication) {

        return quizService.calculateResult(
                id,
                responses,
                authentication.getName()
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuizDTO>> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/history")
    public ResponseEntity<List<AttemptHistoryDTO>> getHistory(
            Authentication authentication) {

        return quizService.getHistory(authentication.getName());
    }

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsDTO> getStatistics(
            Authentication authentication) {

        return quizService.getStatistics(authentication.getName());

    }
}
