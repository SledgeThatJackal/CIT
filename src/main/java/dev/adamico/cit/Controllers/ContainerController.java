package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Services.ContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Set;

@RestController
@RequestMapping("/api/container")
public class ContainerController {
    @Autowired
    private ContainerService containerService;

    @GetMapping
    public Page<Container> getContainerPage(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size){
        return containerService.findAllPaginatedContainers(page, size);
    }

    @GetMapping("/edit")
    public Container getContainer(@RequestParam Long id){
        return containerService.findContainerById(id);
    }

    @GetMapping("/check")
    public void checkIfContainerExists(@RequestParam String scannerId) throws NoSuchElementException {
        containerService.findIfContainerExists(scannerId);
    }

    @PostMapping("/create")
    public void createContainer(@RequestBody Container container){
        containerService.saveContainer(container);
    }

    @PatchMapping("/edit")
    public Container updateContainer(@RequestBody Container container){
        Set<ContainerItem> containerItems = containerService.findContainerById(container.getId()).getContainerItems();
        container.setContainerItems(containerItems);

        return containerService.saveContainer(container);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteContainer(@RequestParam("id") Long id){
        try{
            containerService.deleteContainer(id);

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting container: " + e.getMessage());
        }
    }
}
