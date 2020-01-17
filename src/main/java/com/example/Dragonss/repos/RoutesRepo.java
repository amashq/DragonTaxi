package com.example.Dragonss.repos;

import com.example.Dragonss.domain.Routes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoutesRepo  extends CrudRepository<Routes, Integer> {

//    Iterable<Routes> findAllByPointOfDeparture()
    @Query("select distinct r.pointOfDeparture as start from Routes r")
    List<Object[]> findStartAddresses();

    @Query("select r.pointOfArrival as dest from Routes r WHERE r.pointOfDeparture = :start")
    List<Object[]> findDestAddresses(@Param("start") String start);

    Routes findRoutesById(Long id);
    Routes findRoutesByPointOfDepartureAndPointOfArrival(String pointOfDeparture, String pointOfArrival);
}
