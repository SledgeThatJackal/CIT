package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.ItemAttribute;
import dev.adamico.cit.Models.ItemType;
import dev.adamico.cit.Models.TypeAttribute;
import dev.adamico.cit.Services.ItemAttributeService;
import dev.adamico.cit.Services.TypeAttributeService;
import dev.adamico.cit.Services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/types")
public class TypeController {
    @Autowired
    private TypeService typeService;

    @Autowired
    private TypeAttributeService typeAttributeService;

    @Autowired
    private ItemAttributeService itemAttributeService;

    @GetMapping
    public List<ItemType> getTypes(){
        return typeService.findAll();
    }

    @GetMapping("/attribute/type")
    public List<TypeAttribute> getTypeAttributes(){
        return typeAttributeService.findAll();
    }

    @GetMapping("/attribute/type")
    public List<TypeAttribute> getTypeAttributesById(@RequestParam("id") Long id){
        return typeAttributeService.findByTypeId(id);
    }

    @GetMapping("/attribute/item")
    public List<ItemAttribute> getItemAttributes(@RequestParam("id") Long id){
        return itemAttributeService.findByItemId(id);
    }

    @PostMapping("/create")
    public void createType(@RequestBody ItemType itemType){
        typeService.saveType(itemType);
    }

    @PostMapping("/attribute/type/create")
    public void createTypeAttribute(TypeAttribute typeAttribute){
        typeAttributeService.saveTypeAttribute(typeAttribute);
    }

    @PostMapping("/attribute/item/create")
    public void createItemAttribute(ItemAttribute itemAttribute){
        itemAttributeService.saveItemAttribute(itemAttribute);
    }

    @PutMapping("/edit")
    public void editType(@RequestBody ItemType itemType){
        typeService.saveType((itemType));
    }

    @PutMapping("/attribute/type/edit")
    public void editTypeAttribute(@RequestBody TypeAttribute typeAttribute){
        typeAttributeService.saveTypeAttribute(typeAttribute);
    }

    @PutMapping("/attribute/item/edit")
    public void editItemAttribute(@RequestBody ItemAttribute itemAttribute){
        itemAttributeService.saveItemAttribute(itemAttribute);
    }

    @DeleteMapping("/delete")
    public void deleteType(@RequestParam("id") Long id){
        typeService.deleteType(id);
    }

    @DeleteMapping("/attribute/type/delete")
    public void deleteTypeAttribute(@RequestParam("id") Long id){
        typeAttributeService.deleteTypeAttribute(id);
    }

    @DeleteMapping("/attribute/item/delete")
    public void deleteItemAttribute(@RequestParam("id") Long id){
        itemAttributeService.deleteItemAttribute(id);
    }
}
