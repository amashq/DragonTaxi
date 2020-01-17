package com.example.Dragonss.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Driver {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String username;
    private String nameDriver;
    private String phoneOfDriver;
    private Boolean busy;

    public Driver(String username, String nameDriver, String phoneOfDriver, boolean busy) {
        this.username = username;
        this.nameDriver = nameDriver;
        this.phoneOfDriver = phoneOfDriver;
        this.busy = busy;
    }
}
