package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/container")
public class ContainerController {
    @Autowired
    private ContainerService containerService;

    @GetMapping
    @JsonView(Views.ExclusiveID.class)
    public List<Container> getContainers(){
        return containerService.findAllContainers();
    }

    @GetMapping("/detail")
    @JsonView(Views.InclusiveObject.class)
    public List<Container> getDetailedContainers(){
        return containerService.findAllContainers();
    }

    @PostMapping("/create")
    public void createContainer(@RequestParam Long id, @RequestBody Container container){
        containerService.createContainer(container, id);
    }

    @PutMapping("/edit")
    public void updateContainer(@RequestBody Container container){
        containerService.updateContainer(container);
    }

    @PutMapping("/edit-parent")
    public void updateParentContainer(@RequestParam("id") Long id, @RequestParam("parentId") Long parentId){
        containerService.updateParentContainer(id, parentId);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteContainer(@RequestParam("id") Long id){
        try{
            Container container = containerService.findContainerById(id);
            container.removeChildren();

            containerService.deleteContainer(id);

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting container: " + e.getMessage());
        }
    }
}
