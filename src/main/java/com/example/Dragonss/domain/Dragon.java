package com.example.Dragonss.domain;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.NotBlank;

@Entity
public class Dragon {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    @NotBlank(message = "Имя дракона не может быть пустым")
    private String name;
    private boolean busy;
    private boolean patient;

//    @ElementCollection(targetClass = ClDragon.class, fetch = FetchType.EAGER)
//    @CollectionTable(name = "dragon_class", joinColumns = @JoinColumn(name = "dragon_id"))
//    @Enumerated(EnumType.STRING)
//    private Set<ClDragon> classDragon;
    @Column(name = "class_dragon")
    @Enumerated(EnumType.STRING)
    private ClDragon classDragon;

    public Dragon() {
    }

    public Dragon(String name, boolean busy, boolean patient, ClDragon classDragon) {
        this.name = name;
        this.busy = busy;
        this.patient = patient;
        this.classDragon = classDragon;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isBusy() {
        return busy;
    }

    public void setBusy(boolean busy) {
        this.busy = busy;
    }

    public boolean isPatient() { return patient; }

    public void setPatient(boolean patient) { this.patient = patient; }

    public ClDragon getClassDragon() {
        return classDragon;
    }

    public void setClassDragon(ClDragon classDragon) {
        this.classDragon = classDragon;
    }
}
