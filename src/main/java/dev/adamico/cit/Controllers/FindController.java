package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/find")
public class FindController {
    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    // Item
    @GetMapping("/items")
    ResponseEntity<List<Item>> getItems(){
        return new ResponseEntity<>(itemService.findAllItems(), HttpStatus.OK);
    }

    // Container
    @GetMapping("/containers")
    ResponseEntity<List<Container>> getContainer(){
        return new ResponseEntity<>(containerService.findAllContainers(), HttpStatus.OK);
    }
}
