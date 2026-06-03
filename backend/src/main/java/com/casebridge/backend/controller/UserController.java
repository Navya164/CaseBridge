package com.casebridge.backend.controller;

import com.casebridge.backend.entity.User;
import com.casebridge.backend.repository.UserRepository;
import com.casebridge.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin

public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public User createUser(
            @RequestBody User user
    ) {

        return userRepository.save(user);
    }

    @GetMapping
    public Object getUsers() {

        return userRepository.findAll();
    }

    @PostMapping("/login")

    public Object login(
            @RequestBody User loginUser
    ) {

        User user =
                userRepository
                        .findByEmail(
                                loginUser.getEmail()
                        );

        if(

                user != null

                &&

                user.getPassword().equals(
                        loginUser.getPassword()
                )

        ) {

            String token =
                    jwtUtil.generateToken(
                            user.getEmail()
                    );

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "token",
                    token
            );

            response.put(
                    "role",
                    user.getRole()
            );

            return response;
        }

        return "Invalid Credentials";
    }
    @DeleteMapping("/{id}")
public void deleteUser(
        @PathVariable Long id
) {
    userRepository.deleteById(id);
}
}