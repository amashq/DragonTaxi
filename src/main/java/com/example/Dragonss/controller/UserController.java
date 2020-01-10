package com.example.Dragonss.controller;

import com.example.Dragonss.domain.Role;
import com.example.Dragonss.domain.User;
import com.example.Dragonss.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestWrapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class UserController {
    @Autowired
//    private UserRepo userRepo;
    private UserService userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user")
    public String userList(Model model) {
        model.addAttribute("users", userService.findAll());
        return "userList";
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user/{user}")
    public String userEditForm(@PathVariable User user, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("roles", Role.values());
        return "userEdit";
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/user")
    public String userSave(
            @RequestParam String username,
            @RequestParam Map<String, String> form,
            @RequestParam("userId") User user)
    {
       userService.saveUser(user, username, form);

        return "redirect:/user";
    }

    @GetMapping("/user/profile")
    public String getProfile(Model model, @AuthenticationPrincipal User user){
        model.addAttribute("username", user.getUsername());
//        model.addAttribute("password", user.getPassword());//НЕ БЫЛО!!! ДОБАВИЛА!!!
//        model.addAttribute("phoneNumber", user.getPhoneNumber());

        return "profile";
    }

    @PostMapping("/user/profile")
    public String updateProfile(@AuthenticationPrincipal User user,
                                @RequestParam String password
                                ){//,@RequestParam String phoneNumber

        userService.updateProfile(user, password);//, phoneNumber
        return "redirect:/user/profile";
    }
}
