package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
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

    @PutMapping("/{containerId}&{itemId}")
    void addItemToContainer(@PathVariable Long containerId, @PathVariable Long itemId){
        Container container = containerService.findContainerById(containerId);
        Item item = itemService.findItemById(itemId);

        container.addItem(item);

        containerService.saveContainer(container);
        itemService.saveItem(item);
    }

    @PutMapping("/{parentContainerId}&{childContainerId}")
    void addContainerToAContainer(@PathVariable Long parentContainerId, @PathVariable Long childContainerId){
        Container child = containerService.findContainerById(childContainerId);

        child.setParentContainer(parentContainerId);
        containerService.saveContainer(child);
    }
}
