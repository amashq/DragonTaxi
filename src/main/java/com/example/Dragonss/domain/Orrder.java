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
    private Integer id;
    @NotBlank(message = "Пожалуйста заполните данное поле")
    private String startAddress;
    @NotBlank(message = "Пожалуйста заполните данное поле")
    private String destAddress;
    private String timeTravel;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "classDragon_id")//устанавливаем название поля в БД
    private  String classD;

    private String status;
    private String dragon;
    private String sum;

    @ManyToOne //(optional=false, cascade=CascadeType.ALL)
    @JoinColumn (name="customer_id")
    private Customer customer;

//    @OneToMany //(optional=false, cascade=CascadeType.ALL)///////////////////////////////////
//    @JoinColumn (name="dragon_id")
//    private Dragon nameDragon;

}
