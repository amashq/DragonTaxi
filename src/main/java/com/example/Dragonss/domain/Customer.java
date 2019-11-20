package com.example.Dragonss.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String nameCustomer;
    private String phoneNumber;

//    @OneToMany(mappedBy ="customer")
//    private Set<Orrder> orders = new HashSet<Orrder>();
//
//    public void addOrder(Orrder orrder) { orders.add(orrder); orrder.setCustomer(this); }
//
//    public Set<Orrder> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(Set<Orrder> orders) {
//        this.orders = orders;
//    }

    public Customer() {
    }

    public Customer(String nameCustomer, String phoneNumber) {
        this.nameCustomer = nameCustomer;
        this.phoneNumber = phoneNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
