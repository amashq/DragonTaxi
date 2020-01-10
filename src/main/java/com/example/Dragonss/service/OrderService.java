package com.example.Dragonss.service;

import com.example.Dragonss.domain.Customer;
import com.example.Dragonss.domain.Dragon;
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
    private DragonRepo dragonRepo;
    @Autowired
    private DragonService dragonService;

    public OrderService(OrderRepo orderRepo){this.orderRepo = orderRepo;}

    public void updateOrder(Orrder order){
            Orrder orderFromDb = orderRepo.findOrrderById(order.getId());
            dragonService.setNotBusyDragon(orderFromDb.getDragon());

            orderFromDb.setStatus(order.getStatus());
            orderFromDb.setStartAddress(order.getStartAddress());
            orderFromDb.setDestAddress(order.getDestAddress());
            orderFromDb.setClassD(order.getClassD());
            orderFromDb.setTimeTravel(order.getTimeTravel());
            orderFromDb.setDragon(order.getDragon());
            orderFromDb.setSum(order.getSum());
            orderFromDb.setCustomer(order.getCustomer());

            orderRepo.save(orderFromDb);
    }

    public Iterable<Orrder> findAll(){
        return orderRepo.findAll();
    }

    public Orrder findOrder(Integer id) {return  orderRepo.findOrrderById(id); }

    public void deleteOrder(Integer orderId){
        orderRepo.deleteById(orderId);
    }
}
