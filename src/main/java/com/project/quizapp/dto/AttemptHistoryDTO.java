package com.project.quizapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AttemptHistoryDTO {

    private Integer quizId;
    private String quizTitle;
    private Integer score;
    private Integer totalQuestions;
    private LocalDateTime attemptedAt;

}