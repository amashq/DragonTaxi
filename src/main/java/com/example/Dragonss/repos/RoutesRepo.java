package com.example.Dragonss.repos;

import com.example.Dragonss.domain.Routes;
import org.springframework.data.repository.CrudRepository;

public interface RoutesRepo  extends CrudRepository<Routes, Integer> {
    Routes findRoutesByPointOfArrivalAfterAndPointOfDeparture(String pointOfArrival, String pointOfDeparture);
}
