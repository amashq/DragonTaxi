package com.example.Dragonss.repos;

import com.example.Dragonss.domain.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepo extends CrudRepository<Customer, Integer> {
//    Customer findAllByNameCustomerAndPhoneNumber(String nameCustomer, String phoneNumber);
    Customer findCustomerByNameCustomerAndPhoneNumber(String nameCustomer, String phoneNumber);
}
