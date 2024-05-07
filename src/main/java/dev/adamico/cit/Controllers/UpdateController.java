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

    @PutMapping("/{containerId}&{itemId}")
    void addItemToContainer(@PathVariable Long containerId, @PathVariable Long itemId){
        containerItemService.createContainerItemLink(containerId, itemId);
    }

    @PutMapping("/{parentContainerId}&{childContainerId}")
    void addContainerToAContainer(@PathVariable Long parentContainerId, @PathVariable Long childContainerId){
        Container child = containerService.findContainerById(childContainerId);

        child.setParentContainer(parentContainerId);
        containerService.saveContainer(child);
    }
}
