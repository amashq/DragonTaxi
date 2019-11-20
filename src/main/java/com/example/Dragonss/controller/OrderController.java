package com.example.Dragonss.controller;

//import com.example.Dragonss.domain.Orrder;
import com.example.Dragonss.domain.*;
import com.example.Dragonss.service.CustomerService;
import com.example.Dragonss.service.OrderService;
import com.example.Dragonss.service.RoutesService;
import org.springframework.ui.Model;
import com.example.Dragonss.repos.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@Controller
//@PreAuthorize("hasAuthority('USER')")
public class OrderController {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private RoutesService routesService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderService orderService;


    @GetMapping("/order")
    public String order(Model model) {
//        Iterable<Orrder> orders = orderRepo.findAll();
//        model.put("orders", orders);

        model.addAttribute("clD", ClDragon.values());
        return "order";
    }

    @GetMapping("/listOrders")
    public String order(Map<String, Object> model) {
        Iterable<Orrder> orders = orderRepo.findAll();
        model.put("orders", orders);
        return "listOrders";
    }

    static class OrrderAndCustomer{
        public Orrder order;
        public Customer customer;
    }

    @PostMapping("/listOrders")   //Map<Orrder, Object> json
    public void editOrder(@RequestBody OrrderAndCustomer json){
        json.customer  = customerService.addCustomer(json.customer);
        json.order.setCustomer(json.customer);
        orderService.updateOrder(json.order);

        Iterable<Orrder> orders = orderRepo.findAll();
    }

    @PostMapping("/saveOrder")
    @ResponseBody
    public void addOrder(@RequestBody  OrrderAndCustomer json){
        json.customer  = customerService.addCustomer(json.customer);
        json.order.setCustomer(json.customer);
        json.order.setStatus("Получен");
        json.order.setDragon("Не назначен");
        json.order.setSum("Не назначена");
        orderRepo.save(json.order);
    }

    @PostMapping("/listOrders/del")
    @ResponseBody
    public void delOrder(@RequestBody Orrder order){
        orderRepo.deleteById(order.getId());
   }
//
//    @PostMapping("/order/from")
//    @ResponseBody
//    public List<String> fromRoute(){
//        List<String> routesFrom = [dd,dd,dd];
//        return routesFrom;
//    }

    @PostMapping("/order")
    public String addOrder (
           @Valid Orrder order,
            BindingResult bindingResult,
            Model model) {

        if(bindingResult.hasErrors()) {
           Map<String,String> errorsMap = ControllerUtils.getErrors(bindingResult);
           model.mergeAttributes(errorsMap);
           model.addAttribute("order", order);

        } else {

                Customer customer = customerService.addCustomer(order.getCustomer());

                order.setCustomer(customer);
                order.setStatus("Получен");
                order.setDragon("Не назначен");
                order.setSum("Не назначена");
                model.addAttribute("order", order);

//            model.addAttribute("order", null);
                orderRepo.save(order);
    }

//        Iterable<Orrder> orders = orderRepo.findAll();
//        model.addAttribute("orders", orders);
        model.addAttribute("clD", ClDragon.values());//redirect:/
        return "order";
    }
}
