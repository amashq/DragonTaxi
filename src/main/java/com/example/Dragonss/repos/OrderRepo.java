package com.example.Dragonss.repos;

import com.example.Dragonss.domain.Customer;
import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.domain.Driver;
import com.example.Dragonss.domain.Orrder;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepo extends CrudRepository<Orrder, Integer> {
    Orrder findOrrderById(Long id);

    Iterable<Orrder> findAllByDriver(Driver driver);

    Orrder findOrrderByCustomerAndStartAddressAndDestAddressAndClassDAndTimeTravel(
            Customer customer, String startAddress, String destAddress, String classD, String timeTravel);
}
