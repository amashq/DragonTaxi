package com.example.Dragonss.domain;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Objects;

@Entity

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orrder {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String startAddress;
    @NotBlank(message = "Пожалуйста заполните данное поле")
    private String destAddress;
    private String timeTravel;
    private  String classD;

    private String status;
    private String dragon;
    private Integer sum;

    @ManyToOne
    @JoinColumn (name="driver_id")
    private Driver driver;

    @ManyToOne //(optional=false, cascade=CascadeType.ALL)
    @JoinColumn (name="customer_id")
    private Customer customer;

}
