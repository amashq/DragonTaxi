package com.example.Dragonss.service;

import com.example.Dragonss.domain.Routes;
import com.example.Dragonss.repos.RoutesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutesService {

    @Autowired
    RoutesRepo routesRepo;

    public Integer findCost(String pointOfDeparture, String pointOfArrival ) {
        Routes routes = routesRepo.findRoutesByPointOfDepartureAndPointOfArrival(pointOfDeparture, pointOfArrival);
        return routes.getCost();
    }

    public Iterable<Routes> findAll(){
        return routesRepo.findAll();
    }

    public void deleteRoute(Routes route){
        routesRepo.delete(route);
    }

    public void routeSave(Routes route) {routesRepo.save(route);}

    public Routes findRoute(Long id) {return routesRepo.findRoutesById(id);}

    public List<Object[]> findStartRoute() {return routesRepo.findStartAddresses();}

    public List<Object[]> findDestRoute(String start){
        return routesRepo.findDestAddresses(start);
    }

    public void updateRoute(Routes route){
        Routes routeFromDb = routesRepo.findRoutesById(route.getId());
        routeFromDb.setPointOfDeparture(route.getPointOfDeparture());
        routeFromDb.setPointOfArrival(route.getPointOfArrival());
        routeFromDb.setCost(route.getCost());
        routesRepo.save(routeFromDb);
    }
}
