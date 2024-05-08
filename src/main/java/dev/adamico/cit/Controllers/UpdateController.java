package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Services.ContainerItemService;
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
    private ContainerItemService containerItemService;

    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    @PutMapping("/item/{containerId}&{itemId}&{quantity}")
    void addItemToContainer(@PathVariable Long containerId, @PathVariable Long itemId, @PathVariable Integer quantity){
        containerItemService.createContainerItemLink(containerId, itemId, quantity);
    }

    @PutMapping("/container/{parentContainerId}&{childContainerId}")
    void addContainerToAContainer(@PathVariable Long parentContainerId, @PathVariable Long childContainerId){
        Container child = containerService.findContainerById(childContainerId);

        child.setParentContainer(parentContainerId);
        containerService.saveContainer(child);
    }

    @PutMapping("/{linkId}/quantity={quantity}")
    void changeQuantity(@PathVariable Long linkId, @PathVariable Integer quantity){
        containerItemService.changeQuantityAmount(linkId, quantity);
    }
}
