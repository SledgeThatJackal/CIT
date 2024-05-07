package dev.adamico.bit.Controllers;

import dev.adamico.bit.Models.Container;
import dev.adamico.bit.Services.ContainerService;
import dev.adamico.bit.Services.ItemService;
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
    @PostMapping("/{containerId}/{itemId}")
    void removeItemFromContainer(@PathVariable Long containerId, @PathVariable Long itemId) {
        Container container = containerService.findContainerById(containerId);
        container.removeItem(itemId);
        containerService.saveContainer(container);
    }

    // Container

}
