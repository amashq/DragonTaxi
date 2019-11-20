package com.example.Dragonss.service;


import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.repos.DragonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DragonService {
    @Autowired
    private DragonRepo dragonRepo;

//    public List<Dragon> findAllDragons() {
//        return dragonRepo.findAllById();
//    }

    public DragonService(DragonRepo dragonRepo) {
        this.dragonRepo = dragonRepo;
    }

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
        dragon.setClassDragon(dragon.getClassDragon());//t(Collections.singleton(Role.USER));
        dragonRepo.save(dragon);

        return true;
    }



}
