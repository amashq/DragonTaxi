package com.example.Dragonss.repos;

import com.example.Dragonss.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    User findUserById(Long id);

    Boolean existsByUsername(String username);
}
