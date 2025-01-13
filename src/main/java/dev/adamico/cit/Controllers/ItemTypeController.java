package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.DTO.TypeFormDTO;
import dev.adamico.cit.Models.ItemType;
import dev.adamico.cit.Services.ItemTypeService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/types")
public class ItemTypeController {
    @Autowired
    private ItemTypeService itemTypeService;

    @GetMapping
    @JsonView(Views.Basic.class)
    public List<ItemType> getTypes(){
        return itemTypeService.findAll();
    }

    @PostMapping("/create")
    public Long createType(@RequestBody TypeFormDTO typeFormDTO){
        return itemTypeService.createType(typeFormDTO);
    }

    @PutMapping("/edit")
    public void editType(@RequestBody ItemType itemType){
        itemTypeService.saveType(itemType);
    }

    @DeleteMapping("/delete")
    public void deleteType(@RequestParam("id") Long id){
        itemTypeService.deleteType(id);
    }
}
