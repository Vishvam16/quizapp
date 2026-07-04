package com.project.quizapp.service;

import com.project.quizapp.dao.UserDao;
import com.project.quizapp.dto.LoginResponse;
import com.project.quizapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.project.quizapp.dto.LoginRequest;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<String> register(User user) {

        if (userDao.findByEmail(user.getEmail()).isPresent()) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userDao.save(user);

        return new ResponseEntity<>("User Registered Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> login(LoginRequest loginRequest) {

        Optional<User> optionalUser = userDao.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();

        boolean isPasswordCorrect =
                passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if (!isPasswordCorrect) {
            return new ResponseEntity<>("Invalid Password", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new ResponseEntity<>(new LoginResponse(token), HttpStatus.OK);
    }

}