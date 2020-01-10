package com.example.Dragonss.controller;

import com.example.Dragonss.domain.*;
import com.example.Dragonss.service.CustomerService;
import com.example.Dragonss.service.DragonService;
import com.example.Dragonss.service.OrderService;
import com.example.Dragonss.service.RoutesService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import com.example.Dragonss.repos.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin
//@PreAuthorize("hasAuthority('USER')")
public class OrderController {

    private static final Logger logger = LogManager.getLogger(OrderController.class);

    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private DragonService dragonService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrderService orderService;


    static class OrderAndCustomer{
        public Orrder order;
        public Customer customer;
    }

    @GetMapping("/listOrders")
    public Iterable<Orrder> getAllOrders() { return orderService.findAll(); }

    @GetMapping("/order/{id}")
    public Orrder getOrder( @PathVariable("id") Integer id){
        return orderService.findOrder(id);
    }

    @PostMapping("/updateOrder")
    public ResponseEntity<?> editOrder(@RequestBody OrderAndCustomer json){
        json.customer  = customerService.addCustomer(json.customer);
        json.order.setCustomer(json.customer);
        dragonService.setBusyDragon(json.order.getDragon());
        orderService.updateOrder(json.order);
        return new ResponseEntity<OrderAndCustomer>(json, HttpStatus.OK);
    }


    @PostMapping("/deleteOrder")
    public ResponseEntity<?> delOrder(@RequestBody Orrder order){
        orderService.deleteOrder(order.getId());
        return new ResponseEntity<String>("Заказ удален", HttpStatus.OK);

//        else { return ResponseEntity.notFound().build();}
    }
//
//    @PostMapping("/order/from")
//    @ResponseBody
//    public List<String> fromRoute(){
//        List<String> routesFrom = [dd,dd,dd];
//        return routesFrom;
//    }

    @PostMapping("/order")
    public ResponseEntity<?> addOrder (
            @Valid @RequestBody OrderAndCustomer json,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for(FieldError error: bindingResult.getFieldErrors()){
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);

        }
        json.customer = customerService.addCustomer(json.customer);

        json.order.setCustomer(json.customer);
        json.order.setStatus("Получен");
        json.order.setDragon("Не назначен");
        json.order.setSum("Не назначена");

        logger.debug("Добавлен заказ - order: {}", () -> json.order);
        Orrder ord = orderRepo.save(json.order);

        return new ResponseEntity<Orrder>(ord, HttpStatus.CREATED);
    }
}
