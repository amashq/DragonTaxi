package com.example.Dragonss.controller;

import com.example.Dragonss.domain.ClDragon;
import com.example.Dragonss.domain.Dragon;
import com.example.Dragonss.repos.DragonRepo;
import com.example.Dragonss.service.DragonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
//@RequestMapping("/main")
//@PreAuthorize("hasAnyAuthority('MANAGER', 'ADMIN')")
public class DragonController {
    @Autowired
    private DragonRepo dragonRepo;

    @Autowired
    DragonService dragonService;

    @GetMapping("/main")
//    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    //Map<String, Object>
    public String main(Model model) {

        //Iterable<Dragon> dragons = dragonRepo.findAll();//Туда где список драконов одного класса
        //model.addAttribute("dragons", dragonRepo.findAll());
        model.addAttribute("clD", ClDragon.values());
        return "main";
    }


    static class QueryCountDragon{
        public ClDragon clDragon;
        public Long countDragon;
        public Long countBusyDragon;
        public Long countPatientDragon;
    }

    @GetMapping("/listDragons")
//    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    //Map<String, Object>
    public String listDragons(Model model) {
        List<Object[]> result = dragonRepo.findDragonCount();
        Boolean req = true;
        Map<ClDragon, Long> map = null;
        if(result != null && !result.isEmpty()){
            map = new HashMap<ClDragon, Long>();
            for (Object[] object : result) {
                map.put((ClDragon) object[0],((Long)object[1]));
            }
        }
  //      Iterable<Object[]> d = dragonRepo.findDragonCount();
        model.addAttribute("countDragon", map);
        return "listDragons";
    }



    @PostMapping("/getNamesDragon")
    @ResponseBody
    public List<Dragon> getDragon(@RequestBody Dragon dragon){
        List<Dragon> dragonn = dragonRepo.findByClassDragonAndBusyAndPatient(
                dragon.getClassDragon(), false, false);
        return dragonn;
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


    public String firstUpperCase(String word){
        if(word == null || word.isEmpty()) return "";//или return word;
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    }
}
