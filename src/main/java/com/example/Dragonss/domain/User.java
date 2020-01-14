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
//    private boolean active;

//    @ElementCollection(targetClass = RoleName.class, fetch = FetchType.EAGER )
//    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
//    @Enumerated(EnumType.STRING)
//    private Set<RoleName> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

//    public boolean isAdmin(){
//        return roles.contains(RoleName.ADMIN);
//    }
//
//    public boolean isManager(){
//        return roles.contains(RoleName.MANAGER);
//    }
//
//    public boolean isDraconolog(){
//        return roles.contains(RoleName.DRAGONOLOG);
//    }
//
//    public boolean isCashier(){
//        return roles.contains(RoleName.CASHIER);
//    }
//
//    public boolean isDriverr(){ return roles.contains(RoleName.DRIVER); }

//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return isActive();
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return getRoles();
//    }
}
