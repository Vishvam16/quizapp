package com.project.quizapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatisticsDTO {

    private Integer highestScore;
    private Double averageScore;
    private Integer totalAttempts;
    private Integer totalQuizzesTaken;

}