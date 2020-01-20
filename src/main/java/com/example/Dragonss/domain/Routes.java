package com.example.Dragonss.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table( uniqueConstraints = {@UniqueConstraint(
        columnNames = {"pointOfDeparture", "pointOfArrival"})})
public class Routes {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String pointOfDeparture;
    private String pointOfArrival;
    private Integer cost;

    public Routes(String pointOfDeparture, String pointOfArrival, Integer cost) {
        this.pointOfDeparture = pointOfDeparture;
        this.pointOfArrival = pointOfArrival;
        this.cost = cost;
    }
}
