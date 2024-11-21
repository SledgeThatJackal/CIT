package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.adamico.cit.DTO.ItemFormDTO;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Models.Tag;
import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import dev.adamico.cit.Services.TagService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public Item getItem(@RequestParam long id){
        return itemService.findItemById(id);
    }

    @GetMapping("/page")
    @JsonView(Views.InclusiveID.class)
    public ResponseEntity<String> getItemPage(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size,
                                                    @RequestParam(required = false)Map<String, String> filters) throws JsonProcessingException {
        filters.remove("page");
        filters.remove("size");

        if(filters.get("type").isEmpty()){
            filters.remove("type");
        }

        Page<Item> itemPage = itemService.filterItemPages(page, size, filters);

        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(itemPage);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(jsonString); // I did this because it just wouldn't serialize my data at all.
    }

    @PutMapping("/edit")
    public void updateItem(@RequestBody Item item) {
        itemService.saveItem(item);
    }

    @PostMapping("/create")
    public void createItem(@RequestBody ItemFormDTO dto){
        itemService.createItem(dto);
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