package dev.adamico.bit.Controllers;

import dev.adamico.bit.Models.Container;
import dev.adamico.bit.Models.Item;
import dev.adamico.bit.Services.ContainerService;
import dev.adamico.bit.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/create")
public class CreateController {
    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    // Item
    @PostMapping("/item")
    Item addItem(@RequestBody Item item){
        return itemService.saveItem(item);
    }

    @PostMapping("/item/{containerId}")
    Item addItemToExistingContainer(@RequestBody Item item, @PathVariable Long containerId){
        Container container = containerService.findContainerById(containerId);
        container.addItem(item);

        return itemService.saveItem(item);
    }

    // Container
    @PostMapping("/container")
    Container addContainer(@RequestBody Container container){
        return containerService.saveContainer(container);
    }
}
