package dev.adamico.bit.Controllers;

import dev.adamico.bit.Models.Container;
import dev.adamico.bit.Models.Item;
import dev.adamico.bit.Services.ContainerService;
import dev.adamico.bit.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/update")
public class UpdateController {
    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    @PutMapping("/{containerId}/{itemId}")
    void addItemToContainer(@PathVariable Long containerId, @PathVariable Long itemId){
        Container container = containerService.findContainerById(containerId);
        Item item = itemService.findItemById(itemId);

        container.addItem(item);
        containerService.saveContainer(container);
    }
}
