package com.project.quizapp.service;

import com.project.quizapp.dao.QuestionDao;
import com.project.quizapp.dao.QuizDao;
import com.project.quizapp.dto.QuizDTO;
import com.project.quizapp.model.Question;
import com.project.quizapp.model.QuestionWrapper;
import com.project.quizapp.model.Quiz;
import com.project.quizapp.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.project.quizapp.dao.QuizAttemptDao;
import com.project.quizapp.dao.UserDao;
import com.project.quizapp.model.QuizAttempt;
import com.project.quizapp.model.User;
import java.time.LocalDateTime;
import com.project.quizapp.dto.AttemptHistoryDTO;
import com.project.quizapp.dto.StatisticsDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDao questionDao;

    @Autowired
    private QuizAttemptDao quizAttemptDao;

    @Autowired
    private UserDao userDao;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Question> questions = questionDao.findRandomQuestionsByCategory(category,numQ);

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quizDao.save(quiz);

        return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);

    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Optional<Quiz> quiz = quizDao.findById(id);
        List<Question> questionsFromDB = quiz.get().getQuestions();
        List<QuestionWrapper> questionForUser = new ArrayList<>();
        for(Question q: questionsFromDB){
            QuestionWrapper qw = new QuestionWrapper(q.getId(), q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
            questionForUser.add(qw);
        }

        return new ResponseEntity<>(questionForUser,HttpStatus.OK);
    }

    public ResponseEntity<Integer> calculateResult(
            Integer id,
            List<Response> responses,
            String email) {

        Quiz quiz = quizDao.findById(id).orElseThrow();

        List<Question> questions = quiz.getQuestions();

        int right = 0;

        for (int i = 0; i < responses.size(); i++) {

            if (responses.get(i).getResponse()
                    .equals(questions.get(i).getRightAnswer())) {

                right++;

            }
        }

        User user = userDao.findByEmail(email)
                .orElseThrow();

        QuizAttempt attempt = new QuizAttempt();

        attempt.setQuiz(quiz);
        attempt.setUser(user);
        attempt.setScore(right);
        attempt.setTotalQuestions(questions.size());
        attempt.setAttemptedAt(LocalDateTime.now());

        quizAttemptDao.save(attempt);

        return new ResponseEntity<>(right, HttpStatus.OK);
    }

    public ResponseEntity<List<QuizDTO>> getAllQuizzes() {

        List<Quiz> quizzes = quizDao.findAll();

        List<QuizDTO> response = quizzes.stream()
                .map(q -> new QuizDTO(
                        q.getId(),
                        q.getTitle(),
                        q.getQuestions().size()))
                .toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<AttemptHistoryDTO>> getHistory(String email) {

        User user = userDao.findByEmail(email)
                .orElseThrow();

        List<AttemptHistoryDTO> history = quizAttemptDao
                .findByUserIdOrderByAttemptedAtDesc(user.getId())
                .stream()
                .map(attempt -> new AttemptHistoryDTO(
                        attempt.getQuiz().getId(),
                        attempt.getQuiz().getTitle(),
                        attempt.getScore(),
                        attempt.getTotalQuestions(),
                        attempt.getAttemptedAt()
                ))
                .toList();

        return ResponseEntity.ok(history);
    }

    public ResponseEntity<StatisticsDTO> getStatistics(String email) {

        User user = userDao.findByEmail(email)
                .orElseThrow();

        List<QuizAttempt> attempts =
                quizAttemptDao.findByUserIdOrderByAttemptedAtDesc(user.getId());

        if (attempts.isEmpty()) {

            return ResponseEntity.ok(
                    new StatisticsDTO(
                            0,
                            0.0,
                            0,
                            0
                    )
            );

        }

        int highestScore = attempts.stream()
                .mapToInt(QuizAttempt::getScore)
                .max()
                .orElse(0);

        double averageScore = attempts.stream()
                .mapToInt(QuizAttempt::getScore)
                .average()
                .orElse(0);

        int totalAttempts = attempts.size();

        int totalQuizzesTaken = (int) attempts.stream()
                .map(a -> a.getQuiz().getId())
                .distinct()
                .count();

        return ResponseEntity.ok(
                new StatisticsDTO(
                        highestScore,
                        Math.round(averageScore * 100.0) / 100.0,
                        totalAttempts,
                        totalQuizzesTaken
                )
        );
    }
}
