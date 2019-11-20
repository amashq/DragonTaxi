package com.example.Dragonss.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Routes {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String pointOfDeparture;
    private String pointOfArrival;
    private Integer length;

    public Routes() {
    }

    public Routes(String pointOfDeparture, String pointOfArrival, Integer length) {
        this.pointOfDeparture = pointOfDeparture;
        this.pointOfArrival = pointOfArrival;
        this.length = length;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPointOfDeparture() {
        return pointOfDeparture;
    }

    public void setPointOfDeparture(String pointOfDeparture) {
        this.pointOfDeparture = pointOfDeparture;
    }

    public String getPointOfArrival() {
        return pointOfArrival;
    }

    public void setPointOfArrival(String pointOfArrival) {
        this.pointOfArrival = pointOfArrival;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }
}
