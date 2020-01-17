package com.example.Dragonss.repos;

import com.example.Dragonss.domain.ClDragon;
import com.example.Dragonss.domain.Dragon;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DragonRepo extends CrudRepository<Dragon, Integer> {
    Dragon findDragonByName(String name);
    Dragon findDragonById(Long id);

    List<Dragon> findByClassDragon(ClDragon classDragon);

    Iterable<Dragon> findAllByClassDragonAndBusyAndPatient(ClDragon classDragon, boolean busy, boolean patient);

@Query("select d.classDragon, COALESCE(count(d),0) as cnt from Dragon d GROUP BY d.classDragon")
    List<Object[]> findDragonCount( );

}
