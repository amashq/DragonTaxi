package com.example.Dragonss.repos;

import com.example.Dragonss.domain.ClDragon;
import com.example.Dragonss.domain.Dragon;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
//JpaRepository<Dragon, Integer>

public interface DragonRepo extends CrudRepository<Dragon, Integer> {
//    List<Dragon> findAllById();
//    Dragon findDragonByName
    Dragon findByName(String name);
    Dragon findDragonById(Integer id);

    List<Dragon> findByClassDragon(ClDragon classDragon);

    Iterable<Dragon> findAllByClassDragonAndBusyAndPatient(ClDragon classDragon, boolean busy, boolean patient);

@Query("select d.classDragon, COALESCE(count(d),0) as cnt from Dragon d GROUP BY d.classDragon")
    public List<Object[]> findDragonCount( );//Param("valBusy") Boolean busy, Param("patient") Boolean patient

    @Query("select d.name as name, d.busy as busy from Dragon d WHERE d.classDragon = :class")
    public List<Object[]> findDragonByClassDragon(@Param("class") ClDragon classDragon);

    Dragon findDragonsByClassDragon(ClDragon classDragon);
}
