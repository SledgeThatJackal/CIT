package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/create")
public class CreateController {
    @Autowired
    private ContainerItemService containerItemService;

    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    // Item
    @PostMapping("/item")
    Item addItem(@RequestBody Item item){
        return itemService.saveItem(item);
    }

    // Container
    @PostMapping("/container")
    Container addContainer(@RequestBody Container container){
        return containerService.saveContainer(container);
    }
}
