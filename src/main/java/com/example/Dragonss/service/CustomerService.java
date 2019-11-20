package com.example.Dragonss.service;

import com.example.Dragonss.domain.Customer;
import com.example.Dragonss.repos.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    public CustomerService(CustomerRepo customerRepo) {this.customerRepo = customerRepo;}

    public Customer addCustomer(Customer customer) {
        Customer customerFromDb = customerRepo.findCustomerByNameCustomerAndPhoneNumber(
                customer.getNameCustomer(), customer.getPhoneNumber());

        if (customerFromDb != null) {
            return customerFromDb;
        }

        customer.setNameCustomer(customer.getNameCustomer());
        customer.setPhoneNumber(customer.getPhoneNumber());//t(Collections.singleton(Role.USER));
        customerRepo.save(customer);

        return customer;
    }
}
