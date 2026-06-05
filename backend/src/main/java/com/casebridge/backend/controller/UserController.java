package com.casebridge.backend.controller;

import com.casebridge.backend.entity.User;
import com.casebridge.backend.repository.UserRepository;
import com.casebridge.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    @Autowired
private PasswordEncoder passwordEncoder;

    // REGISTER USER

    @PostMapping

public User createUser(
        @RequestBody User user
) {

    user.setPassword(

            passwordEncoder.encode(
                    user.getPassword()
            )
    );

    return userRepository.save(user);
}

    // GET ALL USERS

    @GetMapping
    public List<User> getUsers() {

        return userRepository.findAll();
    }

    // LOGIN USER

    @PostMapping("/login")

public ResponseEntity<?> login(
        @RequestBody User loginUser
) {

    User user =
            userRepository
                    .findByEmail(
                            loginUser.getEmail()
                    );

    // USER NOT REGISTERED

    if(user == null) {

        return ResponseEntity
                .badRequest()
                .body("Please Register First");
    }

    // WRONG PASSWORD

    if(

        !passwordEncoder.matches(

                loginUser.getPassword(),

                user.getPassword()
        )

)
{
    return ResponseEntity
            .badRequest()
            .body("Invalid Password");
}

    // SUCCESS LOGIN

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

    response.put(
            "userId",
            String.valueOf(user.getId())
    );

    return ResponseEntity.ok(response);
}

    // DELETE USER

    @DeleteMapping("/{id}")

    public void deleteUser(
            @PathVariable Long id
    ) {

        userRepository.deleteById(id);
    }
}