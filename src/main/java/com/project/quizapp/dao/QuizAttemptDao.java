package com.project.quizapp.dao;

import com.project.quizapp.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAttemptDao extends JpaRepository<QuizAttempt, Integer> {

    List<QuizAttempt> findByUserId(Integer userId);

}