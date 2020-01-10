package com.example.Dragonss.service;

import com.example.Dragonss.domain.Role;
import com.example.Dragonss.domain.User;
import com.example.Dragonss.repos.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//import org.springframework.util.StringUtils;
//    !StringUtils.isEmpty(password);

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    //    @Autowired
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null){
            throw new UsernameNotFoundException("Пользователь не найден!");
        }
        return user;
    }

    public boolean addUser(User user) {
        User userFromDb = userRepo.findByUsername(user.getUsername());

        if (userFromDb != null) {
            return false;
        }

        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        userRepo.save(user);

        return true;
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public void saveUser(User user, String username, Map<String, String> form) {
        user.setUsername(username);

        Set<String> roles = Arrays.stream(Role.values())
                .map(Role::name)
                .collect(Collectors.toSet());

        user.getRoles().clear();

        for (String key : form.keySet()) {
            if (roles.contains(key)) {
                user.getRoles().add(Role.valueOf(key));
            }
        }
        userRepo.save(user);
    }

    public void updateProfile(User user, String password) {
        String userPassword = user.getPassword();

        boolean isPasswordChanged = (password != null && !password.equals(userPassword)) ||
                (userPassword != null && !userPassword.equals(password));

        if (isPasswordChanged) {
            user.setPassword(password);
        }
        userRepo.save(user);
    }
}
