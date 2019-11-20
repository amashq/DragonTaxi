package com.example.Dragonss.repos;

import com.example.Dragonss.domain.Orrder;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepo extends CrudRepository<Orrder, Integer> {
//    List<Orrder> findByCustomerId(Integer customerId);
    Orrder findOrrderById(Integer id);
}
