package com.example.Dragonss.controller;

import com.example.Dragonss.domain.Driver;
import com.example.Dragonss.domain.Role;
import com.example.Dragonss.domain.User;
import com.example.Dragonss.payload.UserSummary;
import com.example.Dragonss.repos.DriverRepo;
import com.example.Dragonss.repos.UserRepo;
import com.example.Dragonss.security.CurrentUser;
import com.example.Dragonss.security.UserPrincipal;
import com.example.Dragonss.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private DriverRepo driverRepo;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getUsers")
    public Iterable<User> userList() {
        return userService.findAll();
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepo.findUserById(id);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/editUser")
    public ResponseEntity<?> userSave(@RequestBody User user) {
        userService.updateUser(user);
        if (user.getRoles().contains(Role.DRIVER)) {
            Driver driver = driverRepo.findDriverByNameDriver(user.getUsername());

            if (!(driver == null)) {
            if (!user.getUsername().equals(driver.getUsername())) {
                driverRepo.delete(driver);}}
                Driver driver1 = new Driver(user.getUsername(), user.getUsername(),
                    false);
                driverRepo.save(driver1);
        }
        return new ResponseEntity<>("Изменен", HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/deleteUser")
    public void delUser(@RequestBody User user) {
        userRepo.delete(user);
    }


    @GetMapping("/user/me")
    @PreAuthorize("hasAnyAuthority('USER', 'MANAGER', 'DRAGONOLOG', 'CASHIER', 'DRIVER', 'ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getAuthorities());
    }
}
