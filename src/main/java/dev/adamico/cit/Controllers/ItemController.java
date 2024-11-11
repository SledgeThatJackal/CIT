package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Models.Tag;
import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import dev.adamico.cit.Services.TagService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private TagService tagService;

    @Autowired
    private ContainerService containerService;

    @Autowired
    private ContainerItemService containerItemService;

    @GetMapping
    @JsonView(Views.InclusiveID.class)
    public List<Item> getItems(){
        return itemService.findAllItems();
    }

    @GetMapping("id")
    @JsonView(Views.InclusiveID.class)
    public Item getItem(@RequestParam long id) {
        return itemService.findItemById(id);
    }

    @PostMapping("/create")
    public void createItem(@RequestBody Item item){
        if(item.getContainerItems() != null){
            for(ContainerItem containerItem: item.getContainerItems()){
                containerItem.setItem(item);
            }
        }

        itemService.saveItem(item);
    }

    @PutMapping("/edit")
    public void updateItem(@RequestBody Item item) {
        if(item.getContainerItems() != null){
            for(ContainerItem containerItem: item.getContainerItems()){
                containerItem.setItem(item);
            }
        }

        itemService.saveItem(item);
    }

    @DeleteMapping("/delete-tag")
    public ResponseEntity<?> deleteTag(@RequestParam("itemId") Long itemId, @RequestParam("tagId") Long tagId){
        try{
            Item item = itemService.findItemById(itemId);
            Tag tag = tagService.findTagById(tagId);

            item.getTags().remove(tag);

            itemService.saveItem(item);

            return ResponseEntity.ok().build();
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting tag: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteItem(@RequestParam("id") Long id){
        try{
            itemService.deleteItem(id);

            return ResponseEntity.ok().build();
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting item: " + e.getMessage());
        }
    }
}