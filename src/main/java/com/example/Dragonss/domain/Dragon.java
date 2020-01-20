package com.example.Dragonss.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@NoArgsConstructor
@Table( uniqueConstraints = {@UniqueConstraint(
        columnNames = {"name", "class_dragon"})})
public class Dragon {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "Имя дракона не может быть пустым")
    private String name;
    private boolean busy;
    private boolean patient;

    @Column(name = "class_dragon")
    @Enumerated(EnumType.STRING)
    private ClDragon classDragon;

    public Dragon(String name, boolean busy, boolean patient, ClDragon classDragon) {
        this.name = name;
        this.busy = busy;
        this.patient = patient;
        this.classDragon = classDragon;
    }
}
