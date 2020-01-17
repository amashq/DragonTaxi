package com.example.Dragonss.controller;

import com.example.Dragonss.domain.Driver;
import com.example.Dragonss.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin
//@PreAuthorize("hasAnyAuthority('DRAGONOLOG')")
public class DriverController {

    @Autowired
    private DriverService driverService;

    static class DriverAndPassword{
        public Driver driver;
        public String password;
    }

    @GetMapping("/getNameDriver/{username}")
    @ResponseBody
    public ResponseEntity<?> getNameDriver(@PathVariable("username") String username) {
        Driver driver = driverService.getDriver(username);
//        if (driver.getNameDriver()==null) {
//                return new ResponseEntity<>();
//        }
        return new ResponseEntity<>(driver, HttpStatus.OK);
    }

    @PostMapping("/addDriver")
    @ResponseBody
    public ResponseEntity<?> addDriver(@RequestBody Driver driver) {
        Driver newDriver = new Driver( driver.getUsername(),driver.getNameDriver(), driver.getPhoneOfDriver(), false);
        driverService.saveDriver(newDriver);

        return new ResponseEntity<Driver>(newDriver, HttpStatus.CREATED);
    }


    @PreAuthorize("hasAnyAuthority('MANAGER')")
    @GetMapping("/getFreeDriver")
    @ResponseBody
    public  Iterable<Driver> freeDrivers(){
        return driverService.freeDriver(false);
    }
}
