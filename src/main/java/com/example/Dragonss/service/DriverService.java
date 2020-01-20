package com.example.Dragonss.service;

import com.example.Dragonss.domain.Driver;
import com.example.Dragonss.repos.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    @Autowired
    private DriverRepo driverRepo;

   public Driver getDriver(String username) {
       return driverRepo.findDriverByUsername(username);
   }

    public void saveDriver(Driver driver) {
       driverRepo.save(driver);
    }

    public Iterable<Driver> freeDriver(boolean busy) {
       return driverRepo.findAllByBusy(busy);
    }

    public Driver setDriver(Driver driver) {
       return driverRepo.findDriverByNameDriver( driver.getNameDriver()); }

    public void setBusyDriver(String nameDriver) {
        Driver driverFromDb = driverRepo.findDriverByNameDriver(nameDriver);
        driverFromDb.setBusy(true);
        driverRepo.save(driverFromDb);
    }

    public void setNotBusyDriver(Driver driver) {
        Driver driverFromDb = driverRepo.findDriverByNameDriver(driver.getNameDriver());
        driverFromDb.setBusy(false);
        driverRepo.save(driverFromDb);
    }
}
