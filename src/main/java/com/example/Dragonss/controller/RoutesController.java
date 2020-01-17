package com.example.Dragonss.controller;


import com.example.Dragonss.domain.Routes;
import com.example.Dragonss.service.RoutesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin
public class RoutesController {

    @Autowired
    RoutesService routesService;

    @PreAuthorize("hasAnyAuthority('CASHIER')")
    @GetMapping("/listRoutes")
    public Iterable<Routes> getAllRoutes() {
        return routesService.findAll();
    }

    @PreAuthorize("hasAnyAuthority('CASHIER')")
    @PostMapping("/deleteRoute")
    public ResponseEntity<?> delOrder(@RequestBody Routes route) {
        routesService.deleteRoute(route);
        return new ResponseEntity<String>("Маршрут удален", HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('CASHIER')")
    @PostMapping("/addRoute")
    public ResponseEntity<?> addRoute(@RequestBody Routes route) {
        Routes newRoute = new Routes(route.getPointOfDeparture(),
                route.getPointOfArrival(), route.getCost());
        routesService.routeSave(newRoute);
        return new ResponseEntity<Routes>(newRoute, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('CASHIER')")
    @GetMapping("/route/{id}")
    public Routes getRoute( @PathVariable("id") Long id){
        return routesService.findRoute(id);
    }


    @PreAuthorize("hasAnyAuthority('CASHIER')")
    @PostMapping("/updateRoute")
    @ResponseBody
    public ResponseEntity<?> editRoute(@RequestBody Routes route) {
        routesService.updateRoute(route);
        return new ResponseEntity<Routes>(route, HttpStatus.OK);
    }

    @GetMapping("/getStartAddress")
    public Iterable<Object[]> getStartAddress( ){
        return routesService.findStartRoute();
    }

    @GetMapping("/getDestAddress/{start}")
    public Iterable<Object[]> getStartAddress(@PathVariable String start) {
        return routesService.findDestRoute(start);
    }
}
