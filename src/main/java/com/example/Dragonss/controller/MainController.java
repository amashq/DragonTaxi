package com.example.Dragonss.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;


@Controller
public class MainController {
//    @Autowired
//    private DragonRepo dragonRepo;



    @GetMapping("/")
    public String greeting(Map<String, Object> model)
    {
        return "greeting";
    }

    @PostMapping("/")
    public String greetingg(Map<String, Object> model)
    {
        return "greeting";
    }

    @GetMapping("/about")
    public String about(Map<String, Object> model) { return "about"; }

    @GetMapping("/services")
    public String services(Map<String, Object> model) { return "services"; }

    @GetMapping("/contacts")
    public String contacts(Map<String, Object> model) { return "contacts"; }

//    @GetMapping("/main")
//    public String main(Map<String, Object> model) {
//        Iterable<Dragonssssssss> dragons = dragonRepo.findAll();
//        model.put("dragons", dragons);
//        return "main";
//    }
//
//    @PostMapping("/main")
//    public String add(
//            @AuthenticationPrincipal User user,
//            @RequestParam String name, @RequestParam String rank,
//            @RequestParam String busy, Map<String, Object> model){
//
//        Dragonssssssss dragon = new Dragonssssssss(name, rank, busy, user);
//        dragonRepo.save(dragon);
//
//        Iterable<Dragonssssssss> dragons = dragonRepo.findAll();
//        model.put("dragons", dragons);
//
//        return "main";
//    }

}