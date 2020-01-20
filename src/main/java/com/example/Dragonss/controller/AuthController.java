package com.example.Dragonss.controller;

import com.example.Dragonss.exception.AppException;
import com.example.Dragonss.domain.Role;
//import com.example.Dragonss.domain.RoleName;
import com.example.Dragonss.domain.User;
import com.example.Dragonss.payload.ApiResponse;
import com.example.Dragonss.payload.JwtAuthenticationResponse;
import com.example.Dragonss.payload.LoginRequest;
//import com.example.Dragonss.repos.RoleRepository;
import com.example.Dragonss.payload.SignUpRequest;
import com.example.Dragonss.repos.UserRepo;
import com.example.Dragonss.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepo.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getUsername(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRoles(Collections.singleton(Role.USER));

        User result = userRepo.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}