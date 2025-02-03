package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Repositories.ContainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ContainerService {
    @Autowired
    private ContainerRepository containerRepository;

    public List<Container> findAllContainers(){
        return containerRepository.findAll();
    }

    public Page<Container> findAllPaginatedContainers(int page, int size){
        Pageable pageable = PageRequest.of(page, size);

        return containerRepository.findAll(pageable);
    }

    public Container findContainerById(Long id){
        return containerRepository.findById(id).orElse(null);
    }

    public Container findContainerByName(String name){
        return containerRepository.findByName(name).orElse(null);
    }

    public Optional<Container> findContainerByScannerId(String scannerId){
        return containerRepository.findByScannerId(scannerId);
    }

    public List<Container> findContainersByArea(boolean isArea, Long containerId) {
        return containerRepository.findAllByIsArea(isArea, containerId);
    }

    public void saveContainer(Container container){
        containerRepository.save(container);
    }

    public void createContainer(Container container, Long parentId){
        Container parent = findContainerById(parentId);
        if(parent != null){
            container.addParent(parent);
        }

        if(container.getImages() != null){
            container.getImages().forEach(image -> image.setContainer(container));
        }

        saveContainer(container);
    }

    public void updateContainer(Container container){
        if(container.getContainerItems() != null){
            for(ContainerItem containerItem: container.getContainerItems()){
                containerItem.setContainer(container);
            }
        }

        if(container.getImages() != null){
            container.getImages().forEach(image -> image.setContainer(container));
        }

        saveContainer(container);
    }

    public void updateParentContainer(Long containerId, Long parentId){
        Container container = findContainerById(containerId);
        Container parentContainer = findContainerById(parentId);

        if(parentContainer != null){
            if(container.getDescendants().contains(parentContainer)){
                throw new IllegalArgumentException("This container is already part of the parent's tree");
            }

            container.addParent(parentContainer);
        } else {
            container.setParentContainer(null);
        }

        saveContainer(container);
    }

    public void deleteContainer(Long id){
        containerRepository.deleteById(id);
    }

    public void findIfContainerExists(String scannerId) throws NoSuchElementException{
        if(containerRepository.findByScannerId(scannerId).isEmpty()){
            throw new NoSuchElementException("Container ID does not exist");
        }
    }
}
