package com.example.Dragonss.service;

import com.example.Dragonss.domain.Routes;
import com.example.Dragonss.repos.RoutesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoutesService {

    @Autowired
    RoutesRepo routesRepo;

    public Routes loadRoute(String from, String dest) throws Exception{
        Routes route = routesRepo.findRoutesByPointOfArrivalAfterAndPointOfDeparture(from,dest);
        if (route == null){
            throw new Exception("Такого пути не существует!");
        }
        return route;
    }
}
