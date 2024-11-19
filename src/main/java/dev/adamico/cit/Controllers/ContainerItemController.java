package dev.adamico.cit.Controllers;

import dev.adamico.cit.Services.ContainerItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/link")
public class ContainerItemController {
    @Autowired
    private ContainerItemService containerItemService;

    @PostMapping
    public void createLink(@RequestParam Long itemId, Long containerId, Integer quantity){
        containerItemService.createLink(itemId, containerId, quantity);
    }

    @PutMapping
    public void updateQuantity(@RequestParam Integer quantity, @RequestParam Long id){
        containerItemService.updateQuantity(quantity, id);
    }

    @DeleteMapping
    public void deleteLink(@RequestParam Long id){
        containerItemService.removeContainerItemLink(id);
    }
}
