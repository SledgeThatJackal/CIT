package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.ItemAttribute;
import dev.adamico.cit.Services.ItemAttributeService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attribute/item")
public class ItemAttributeController {
    @Autowired
    private ItemAttributeService itemAttributeService;

    @Autowired
    private EntityManager entityManager;

    @GetMapping
    public List<ItemAttribute> getItemAttributes(@RequestParam("id") Long id){
        return itemAttributeService.findByItemId(id);
    }

    @PostMapping("/create")
    public void createItemAttribute(@RequestBody ItemAttribute itemAttribute){
        itemAttributeService.saveItemAttribute(itemAttribute);
    }

    @PutMapping("/edit")
    public void editItemAttribute(@RequestBody ItemAttribute itemAttribute){
        ItemAttribute itemAttr = entityManager.getReference(ItemAttribute.class, itemAttribute.getId());

        itemAttribute.setItem(itemAttr.getItem());

        itemAttributeService.saveItemAttribute(itemAttribute);
    }

    @DeleteMapping("/delete")
    public void deleteItemAttribute(@RequestParam("id") Long id){
        itemAttributeService.deleteItemAttribute(id);
    }
}
