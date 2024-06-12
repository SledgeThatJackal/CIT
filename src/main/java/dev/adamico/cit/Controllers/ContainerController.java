package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Services.ContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("/edit")
    public Container updateContainer(@RequestBody Container container){
        return containerService.saveContainer(container);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteContainer(@RequestBody Container container){
        try{
            containerService.deleteContainer(container);

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting container: " + e.getMessage());
        }
    }
}
