package dev.adamico.cit.Controllers;

import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exim")
public class EximController { // EX port IM port
    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    @Autowired
    ContainerItemService containerItemService;


}
