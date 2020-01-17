package com.example.Dragonss.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@AllArgsConstructor
public class UserSummary {
    private Long id;
    private String username;
    private Collection<? extends GrantedAuthority> role;
}