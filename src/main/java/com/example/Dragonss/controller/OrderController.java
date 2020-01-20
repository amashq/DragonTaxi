package com.example.Dragonss.controller;

import com.example.Dragonss.domain.*;
import com.example.Dragonss.service.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin
public class OrderController {

    private static final Logger logger = LogManager.getLogger(OrderController.class);

    @Autowired
    private DragonService dragonService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private RoutesService routesService;
    @Autowired
    private DriverService driverService;


    static class OrderAndCustomer{
        public Orrder order;
        public Customer customer;
        public Driver driver;
    }

    @GetMapping(value = {"/order", "/login", "/contacts", "/about",
    "/services", "/listOrders", "/listDragons", "/listNamesDragons",
            "/listRoutes", "/allOrders", "/users"})
    public void defaultPage(HttpServletRequest request,
                              HttpServletResponse response)
            throws IOException, ServletException {
        request.getRequestDispatcher("/").forward(request, response);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping("/getAllOrders")
    public Iterable<Orrder> getAllOrders() { return orderService.findAll(); }

    @PreAuthorize("hasAnyAuthority('MANAGER', 'DRIVER')")
    @GetMapping("/order/{id}")
    public Orrder getOrder( @PathVariable("id") Long id){
        return orderService.findOrder(id);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping("/getNamesDragon/{classD}")
    @ResponseBody
    public Iterable<Dragon> getDragon(@PathVariable("classD") ClDragon classDragon){
        return dragonService.getDragons(classDragon);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @PostMapping("/updateOrder")
    public ResponseEntity<?> editOrder(@RequestBody OrderAndCustomer json){
        json.customer  = customerService.addCustomer(json.customer);
        json.order.setCustomer(json.customer);

        if (!json.order.getDragon().equals("Не назначен")) {
        dragonService.setBusyDragon(json.order.getDragon()); }

        json.driver = driverService.setDriver(json.driver);
            if (!(json.driver == null)) {
        driverService.setBusyDriver(json.driver.getNameDriver());
        }

        json.order.setDriver(json.driver);
        orderService.updateOrder(json.order);
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @PostMapping("/deleteOrder")
    public ResponseEntity<?> delOrder(@RequestBody Orrder order){
        if (!order.getDragon().equals("Не назначен")) {
            dragonService.setNotBusyDragon(order.getDragon());
        }
         Driver driver = order.getDriver();
        if (!(driver == null)) {
            driverService.setNotBusyDriver(order.getDriver());}
        orderService.deleteOrder(order);
        return new ResponseEntity<String>("Заказ удален", HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DRIVER')")
    @GetMapping("/listDriversOrders/{usernameDriver}")
    public Iterable<Orrder>  getDriversOrders(@PathVariable String usernameDriver) {
        Driver driver = driverService.getDriver(usernameDriver);
        return orderService.findDriverOrder(driver);
    }

    @PreAuthorize("hasAuthority('DRIVER')")
    @PostMapping("/updateStatus")
    public void updateStatus(@RequestBody Orrder order) {
        orderService.updateStatus(order);
    }

    @PostMapping("/orderpost")
    public ResponseEntity<?> addOrder (
            @Valid @RequestBody OrderAndCustomer json,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for(FieldError error: bindingResult.getFieldErrors()){
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);

        }
        json.customer = customerService.addCustomer(json.customer);

        json.order.setCustomer(json.customer);
        json.order.setStatus("Получен");
        json.order.setDragon("Не назначен");
//        json.order.setDriver(null);
        json.order.setSum(routesService.findCost(json.order.getStartAddress(), json.order.getDestAddress()));

        logger.debug("Добавлен заказ - order: {}", () -> json.order);
        Orrder ord = orderService.saveOrder(json.order);

        return new ResponseEntity<Orrder>(ord, HttpStatus.CREATED);
    }
}
