package com.example.Dragonss.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usr", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        })})

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;

//    @Transient
//    @NotBlank(message = "Повторный пароль не может быть пустым")
//    private String password2;
    private boolean active;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER )
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public boolean isAdmin(){
        return roles.contains(Role.ADMIN);
    }

//    public boolean isUser(){
//        return roles.contains(Role.USER);
//    }

    public boolean isManager(){
        return roles.contains(Role.MANAGER);
    }

    public boolean isDraconolog(){
        return roles.contains(Role.DRAGONOLOG);
    }

    public boolean isCashier(){
        return roles.contains(Role.CASHIER);
    }

    public boolean isDriver(){ return roles.contains(Role.DRIVER); }
}
