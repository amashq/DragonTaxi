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
@AllArgsConstructor
public class Routes {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String pointOfDeparture;
    private String pointOfArrival;
    private Integer cost;
}
