package com.example.Dragonss.service;

import com.example.Dragonss.domain.Customer;
import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.domain.Driver;
import com.example.Dragonss.domain.Orrder;
import com.example.Dragonss.repos.DragonRepo;
import com.example.Dragonss.repos.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private DragonService dragonService;
    @Autowired
    private DriverService driverService;

    public OrderService(OrderRepo orderRepo){this.orderRepo = orderRepo;}

    public void updateOrder(Orrder order){
            Orrder orderFromDb = orderRepo.findOrrderById(order.getId());
            if (!order.getDragon().equals("Не назначен")) {
            dragonService.setNotBusyDragon(orderFromDb.getDragon());}
            if (!order.getDriver().getNameDriver().isEmpty()) {
            driverService.setNotBusyDriver(orderFromDb.getDriver());}

            orderFromDb.setStatus(order.getStatus());
            orderFromDb.setStartAddress(order.getStartAddress());
            orderFromDb.setDestAddress(order.getDestAddress());
            orderFromDb.setClassD(order.getClassD());
            orderFromDb.setTimeTravel(order.getTimeTravel());
            orderFromDb.setDragon(order.getDragon());
            orderFromDb.setSum(order.getSum());
            orderFromDb.setCustomer(order.getCustomer());
            orderFromDb.setDriver(order.getDriver());

            orderRepo.save(orderFromDb);
    }

    public void updateStatus(Orrder order) {
        Orrder orderFromDb = orderRepo.findOrrderById(order.getId());
        orderFromDb.setStatus("Выполнен");
        orderRepo.save(orderFromDb);
    }

    public Iterable<Orrder> findAll(){
        return orderRepo.findAll();
    }

    public Iterable<Orrder> findDriverOrder(Driver driver) {
        return orderRepo.findAllByDriver(driver);
    }

    public Orrder findOrder(Long id) {return  orderRepo.findOrrderById(id); }

    public void deleteOrder(Orrder order){
        orderRepo.delete(order);
    }

    public Orrder saveOrder(Orrder order) { return orderRepo.save(order); }
}
