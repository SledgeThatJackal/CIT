package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
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
        Container parent = containerService.findContainerById(id);
        if(parent != null){
            container.addParent(parent);
        }

        containerService.saveContainer(container);
    }

    @PutMapping("/edit")
    public void updateContainer(@RequestBody Container container){
        if(container.getContainerItems() != null){
            for(ContainerItem containerItem: container.getContainerItems()){
                containerItem.setContainer(container);
            }
        }

        containerService.saveContainer(container);
    }

    @PutMapping("/edit-parent")
    public void updateParentContainer(@RequestParam("id") Long id, @RequestParam Long parentId){
        Container container = containerService.findContainerById(id);
        Container parentContainer = containerService.findContainerById(parentId);

        if(parentContainer != null){
            if(container.getDescendants().contains(parentContainer)){
                throw new IllegalArgumentException("This container is already part of the parent's tree");
            }

            container.addParent(parentContainer);
        } else {
            container.setParentContainer(null);
        }

        containerService.saveContainer(container);
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
