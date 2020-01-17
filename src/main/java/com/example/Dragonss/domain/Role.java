package com.example.Dragonss.domain;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER, ADMIN, MANAGER, DRAGONOLOG, CASHIER, DRIVER;

    @Override
    public String getAuthority() {
        return name();
    }
}
