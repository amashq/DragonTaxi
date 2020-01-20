package com.example.Dragonss.controller;

import com.example.Dragonss.domain.ClDragon;
import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.repos.DragonRepo;
import com.example.Dragonss.service.DragonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;


@RestController
@RequestMapping
@CrossOrigin
@PreAuthorize("hasAnyAuthority('DRAGONOLOG')")
public class DragonController {

    @Autowired
    DragonService dragonService;

    static class CountDragons{
        public ClDragon classDragon;
        public Long countDragons;
    }

    @GetMapping("/listAllDragons")
    public Iterable<CountDragons> listDragons() {
        List<Object[]> result = dragonService.getCountDragons();
        List<CountDragons> listD = new LinkedList<>();

        for (Object[] object : result) {
            CountDragons countDragons = new CountDragons();
            countDragons.classDragon = (ClDragon) object[0];
            countDragons.countDragons = ((Long)object[1]);
            listD.add(countDragons);
        }
        return listD;
    }

    @GetMapping("/listDragons/{classDragon}")
    public Iterable<Dragon> listOfClassDragons(@PathVariable ClDragon classDragon) {
        return dragonService.getNamesDragons(classDragon);
    }

    @PostMapping("/deleteDragon")
    @ResponseBody
    public ResponseEntity<?> delDragon(@RequestBody Dragon dragon){
        dragonService.deleteDragon(dragon);
        return new ResponseEntity<>("Дракон удален", HttpStatus.OK);
    }

    @GetMapping("/dragon/{id}")
    public Dragon getOrder( @PathVariable("id") Long id){
        return dragonService.findDragon(id);
    }

    @PostMapping("/updateDragon")
    @ResponseBody
    public ResponseEntity<?> editDragon(@RequestBody Dragon dragon) {
        dragonService.updateDragon(dragon);
        return new ResponseEntity<Dragon>(dragon, HttpStatus.OK);
    }

    @PostMapping("/addDragon")
    @ResponseBody
    public ResponseEntity<?> addDragon(@RequestBody Dragon dragon) {
        Dragon newDragon = new Dragon(dragon.getName(), false,
                dragon.isPatient(), dragon.getClassDragon());
        dragonService.saveDragon(newDragon);
        return new ResponseEntity<Dragon>(newDragon, HttpStatus.CREATED);
    }
}
