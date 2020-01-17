package com.example.Dragonss.repos;

import com.example.Dragonss.domain.Driver;
import org.springframework.data.repository.CrudRepository;

public interface DriverRepo extends CrudRepository<Driver, Integer> {
    Driver findDriverByUsername(String username);

    Iterable<Driver> findAllByBusy(Boolean busy);

    Driver findDriverByNameDriver(String nameDriver);
}
