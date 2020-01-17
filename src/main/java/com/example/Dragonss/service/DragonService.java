package com.example.Dragonss.service;


import com.example.Dragonss.domain.ClDragon;
import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.domain.Orrder;
import com.example.Dragonss.repos.DragonRepo;
import com.example.Dragonss.repos.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DragonService {
    @Autowired
    private DragonRepo dragonRepo;

    public void setBusyDragon(String nameDragon) {
        Dragon dragonFromDb = dragonRepo.findDragonByName(nameDragon);
        dragonFromDb.setBusy(true);
        dragonRepo.save(dragonFromDb);
    }

    public void setNotBusyDragon(String nameDragon) {
        Dragon dragonFromDb = dragonRepo.findDragonByName(nameDragon);
        dragonFromDb.setBusy(false);
        dragonRepo.save(dragonFromDb);
    }


    public void saveDragon(Dragon dragon) { dragonRepo.save(dragon);}

    public Iterable<Dragon> getNamesDragons(ClDragon classDragon){
        return dragonRepo.findByClassDragon(classDragon);
    }

    public List<Object[]> getCountDragons() {
        return dragonRepo.findDragonCount();
    }

    public Iterable<Dragon> getDragons(ClDragon classDragon){
        return dragonRepo.findAllByClassDragonAndBusyAndPatient(
                classDragon, false, false);
    }

    public void deleteDragon(Dragon dragon) { dragonRepo.delete(dragon); }

    public Dragon findDragon(Long id) {return  dragonRepo.findDragonById(id); }



    public void updateDragon(Dragon dragon){
        Dragon dragonFromDb = dragonRepo.findDragonById(dragon.getId());
//        dragonFromDb.setClassDragon(dragon.getClassDragon());
        if (dragon.isPatient()){
            dragonFromDb.setPatient(true);
            dragonFromDb.setBusy(true);
//            Orrder order = orderRepo.findOrrderByDragon(dragon.getName());
        } else if (!dragon.isPatient() && dragonFromDb.isPatient()){
            dragonFromDb.setPatient(false);
            dragonFromDb.setBusy(false);
        } else {
            dragonFromDb.setBusy(dragon.isBusy());
            dragonFromDb.setPatient(dragon.isPatient());
        }
        dragonFromDb.setName(dragon.getName());
        dragonRepo.save(dragonFromDb);
    }

    public boolean addDragon(Dragon dragon) {
        Dragon dragonFromDb = dragonRepo.findDragonByName(dragon.getName());//было закомменчено

        if (dragonFromDb != null) {//было закомменчено
            return false;//было закомменчено
        }//было закомменчено

        dragon.setBusy(false);
        dragon.setPatient(false);
        dragon.setClassDragon(dragon.getClassDragon());
        dragonRepo.save(dragon);

        return true;
    }



}
