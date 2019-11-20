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
    // @Length(max=2048, message = "Слишком большой адрес")//Посмотри размер поля в БД
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


//    public Orrder(String startAddress, String destAddress, String timeTravel, String classD,
//                  String status, Customer customer, String dragon, String sum) {
//        this.startAddress = startAddress;
//        this.destAddress = destAddress;
//        this.timeTravel = timeTravel;
//        this.classD = classD;
//        this.status = status;
//        this.customer = customer;
//        this.dragon = dragon;
//        this.sum = sum;
//    }

}
