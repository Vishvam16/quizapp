package com.project.quizapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuizDTO {

    private Integer id;

    private String title;

    private Integer totalQuestions;

}