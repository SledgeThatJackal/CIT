package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/page")
    public Page<Container> getContainerPage(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size){
        return containerService.findAllPaginatedContainers(page, size);
    }

    @GetMapping("/edit")
    public Container getContainer(@RequestParam Long id){
        return containerService.findContainerById(id);
    }

    @PostMapping("/create")
    public void createContainer(@RequestBody Container container){
        containerService.saveContainer(container);
    }

    @PutMapping("/edit")
    public void updateContainer(@RequestBody Container container){
        if(container.getContainerItems() != null){
            for(ContainerItem containerItem: container.getContainerItems()){
                containerItem.setContainer(container);
            }
        }

        Container parentContainer = container.getParentContainer();
        if(parentContainer != null){
            if(parentContainer.getContainerItems() != null){
                for(ContainerItem containerItem: parentContainer.getContainerItems()){
                    containerItem.setContainer(parentContainer);
                }
            }

            container.addParent(parentContainer);
        }

        assert parentContainer != null;
        if(parentContainer.getChildContainers().contains(container)){
            throw new IllegalArgumentException("This container is already part of the parent's tree");
        }

        containerService.saveContainer(container);
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
