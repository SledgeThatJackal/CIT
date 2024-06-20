package dev.adamico.cit.Controllers;

import dev.adamico.cit.Services.ContainerItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/link")
public class ContainerItemController {
    @Autowired
    ContainerItemService containerItemService;

    @DeleteMapping
    public void deleteLink(@RequestParam Long id){
        containerItemService.removeContainerItemLink(id);
    }
}
