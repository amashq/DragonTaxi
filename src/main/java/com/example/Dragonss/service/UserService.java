package com.example.Dragonss.service;

import com.example.Dragonss.domain.Role;
import com.example.Dragonss.domain.User;
import com.example.Dragonss.repos.UserRepo;
import com.example.Dragonss.security.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
            throw new UsernameNotFoundException("Пользователь " + username + " не найден!");
        }
        return new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(), user.getRoles());
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepo.findUserById(id);
        if (user == null){
            throw new UsernameNotFoundException("User not found with id : " + id);
        }
        return new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(), user.getRoles());
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

    public void updateUser(User user) {
        User userFromDb = userRepo.findUserById(user.getId());
        userFromDb.setUsername(user.getUsername());
        userFromDb.setRoles(user.getRoles());
        userRepo.save(userFromDb);
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
