package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delete")
public class DeleteController {
    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    // Item
    @PostMapping("/item/{containerId}/{itemId}")
    void removeItemFromContainer(@PathVariable Long containerId, @PathVariable Long itemId) {
        Container container = containerService.findContainerById(containerId);
        Item item = itemService.findItemById(itemId);

        container.removeItem(item);
        containerService.saveContainer(container);
    }

    // Container
    @PostMapping("/container={childContainerId}")
    void removeContainerFromContainer(@PathVariable Long childContainerId){
        Container child = containerService.findContainerById(childContainerId);

        child.setParentContainer(null);
        containerService.saveContainer(child);
    }
}