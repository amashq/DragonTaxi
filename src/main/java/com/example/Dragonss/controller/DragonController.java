package com.example.Dragonss.controller;

import com.example.Dragonss.domain.ClDragon;
import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.repos.DragonRepo;
import com.example.Dragonss.service.DragonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;


@RestController
@RequestMapping
@CrossOrigin
//@RequestMapping("/main")
//@PreAuthorize("hasAnyAuthority('MANAGER', 'ADMIN')")
public class DragonController {
    @Autowired
    private DragonRepo dragonRepo;

    @Autowired
    DragonService dragonService;

    @GetMapping("/getNamesDragon/{classD}")
    @ResponseBody
    public Iterable<Dragon> getDragon(@PathVariable("classD") ClDragon classDragon){
        return dragonService.getDragons(classDragon);
    }

    static class CountDragons{
        public ClDragon classDragon;
        public Long countDragons;
    }

    @GetMapping("/listDragons")
    public Iterable<CountDragons> listDragons() {
        List<Object[]> result = dragonService.getCountDragons();
        List<CountDragons> listD = new LinkedList<>();

        for (Object[] object : result) {
            CountDragons countDragons = new CountDragons();
            countDragons.classDragon = (ClDragon) object[0];
            countDragons.countDragons = ((Long)object[1]);
            listD.add(countDragons);
        }
        return listD;
    }

    @GetMapping("/listDragons/{classDragon}")
    public Iterable<Dragon> listOfClassDragons(@PathVariable ClDragon classDragon) {
        return dragonService.getNamesDragons(classDragon);
    }

    @PostMapping("/deleteDragon")
    @ResponseBody
    public ResponseEntity<?> delDragon(@RequestBody Dragon dragon){
        dragonService.deleteDragon(dragon.getId());
        return new ResponseEntity<String>("Дракон удален", HttpStatus.OK);
    }

    @GetMapping("/dragon/{id}")
    public Dragon getOrder( @PathVariable("id") Integer id){
        return dragonService.findDragon(id);
    }











//    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")



    static class QueryCountDragon{
        public ClDragon clDragon;
        public Long countDragon;
        public Long countBusyDragon;
        public Long countPatientDragon;
    }


    @PostMapping("/listDragons")
    public String showListDragons(Model model) {
        return "nameDragons";
    }

    @PostMapping("/nameDragons")
    public String listOfClassDragons(Dragon dragon, Model model) {
        List<Dragon> dragons = dragonRepo.findByClassDragon(dragon.getClassDragon());
        model.addAttribute("dragons", dragons);
        return "nameDragons";
    }

    @PostMapping("/dragon/del")
    @ResponseBody
    public void delOrder(@RequestBody Dragon dragon){
        dragonRepo.deleteById(dragon.getId());
    }


    @PostMapping("/saveDragon")   //Map<Orrder, Object> json
    @ResponseBody
    public void editDragon(@RequestBody Dragon dragon) {
        dragonService.updateDragon(dragon);
    }

    //    @PostMapping("/main")
////    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
//    public String add(
////            @AuthenticationPrincipal User user,
//            @RequestParam String name, Boolean busy, @RequestParam Set<ClDragon> classDragon,
//            Model model){
//         busy = false;
//         Dragon dragon = new Dragon(name, busy, classDragon);
//         dragonRepo.save(dragon);
//        Iterable<Dragon> dragons = dragonRepo.findAll();
//
//        model.addAttribute("dragons", dragons);
//        model.addAttribute("clD", ClDragon.values());
//        return "main";
//    }
    @PostMapping("/main")
    public String addDragon(@Valid Dragon dragon, BindingResult bindingResult, Model model){

        if (bindingResult.hasErrors()){
            Map<String, String> errors = ControllerUtils.getErrors(bindingResult);
            model.mergeAttributes(errors);
//                      model.addAttribute("dragon", dragon);
            model.addAttribute("clD", ClDragon.values());
            return "main";
        }

            if (!dragonService.addDragon(dragon)) {
                model.addAttribute("clD", ClDragon.values());
                return "main";
            }

            return "redirect:/main";///изменить????????
}

}
