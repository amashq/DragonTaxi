package com.example.Dragonss.service;

import com.example.Dragonss.domain.Customer;
import com.example.Dragonss.domain.Orrder;
import com.example.Dragonss.repos.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    public OrderService(OrderRepo orderRepo){this.orderRepo = orderRepo;}

    public void updateOrder(Orrder order){
            Orrder orderFromDb = orderRepo.findOrrderById(order.getId());
            orderFromDb.setStatus(order.getStatus());
            orderFromDb.setCustomer(order.getCustomer());
            orderFromDb.setStartAddress(order.getStartAddress());
            orderFromDb.setDestAddress(order.getDestAddress());
            orderFromDb.setClassD(order.getClassD());
            orderFromDb.setTimeTravel(order.getTimeTravel());
            orderFromDb.setDragon(order.getDragon());
            orderFromDb.setSum(order.getSum());

            orderRepo.save(orderFromDb);
    }

//    public void deleteOrder(Integer orderId){
//        orderRepo.deleteById(orderId);
//    }
}
