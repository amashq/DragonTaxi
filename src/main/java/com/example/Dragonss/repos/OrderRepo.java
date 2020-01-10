package com.example.Dragonss.repos;

import com.example.Dragonss.domain.Customer;
import com.example.Dragonss.domain.Orrder;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepo extends CrudRepository<Orrder, Integer> {
//    List<Orrder> findByCustomerId(Integer customerId);
    Orrder findOrrderById(Integer id);

    Orrder findOrrderByCustomerAndStartAddressAndDestAddressAndClassDAndTimeTravel(
            Customer customer, String startAddress, String destAddress, String classD, String timeTravel);
}
