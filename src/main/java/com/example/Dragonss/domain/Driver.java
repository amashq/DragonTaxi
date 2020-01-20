package com.example.Dragonss.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(
        columnNames = {"username", "nameDriver"})})
public class Driver {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String username;
    private String nameDriver;
    private Boolean busy;

    public Driver(String username, String nameDriver,  boolean busy) {
        this.username = username;
        this.nameDriver = nameDriver;
        this.busy = busy;
    }
}
