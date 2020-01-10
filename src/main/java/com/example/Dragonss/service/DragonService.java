package com.example.Dragonss.service;


import com.example.Dragonss.domain.ClDragon;
import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.repos.DragonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DragonService {
    @Autowired
    private DragonRepo dragonRepo;

    public DragonService(DragonRepo dragonRepo) {
        this.dragonRepo = dragonRepo;
    }

    public void setBusyDragon(String nameDragon) {
        Dragon dragonFromDb = dragonRepo.findByName(nameDragon);
        dragonFromDb.setBusy(true);
        dragonRepo.save(dragonFromDb);
    }

    public void setNotBusyDragon(String nameDragon) {
        Dragon dragonFromDb = dragonRepo.findByName(nameDragon);
        dragonFromDb.setBusy(false);
        dragonRepo.save(dragonFromDb);
    }



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

    public void deleteDragon(Integer id) { dragonRepo.deleteById(id); }

    public Dragon findDragon(Integer id) {return  dragonRepo.findDragonById(id); }



    public void updateDragon(Dragon dragon){
        Dragon dragonFromDb = dragonRepo.findDragonById(dragon.getId());
        dragonFromDb.setClassDragon(dragon.getClassDragon());
        dragonFromDb.setName(dragon.getName());
        dragonFromDb.setBusy(dragon.isBusy());
        dragonFromDb.setPatient(dragon.isPatient());

        dragonRepo.save(dragonFromDb);
    }

    public boolean addDragon(Dragon dragon) {
        Dragon dragonFromDb = dragonRepo.findByName(dragon.getName());//было закомменчено

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
