package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContainerService {
    @Autowired
    ContainerRepository containerRepository;

    public List<Container> findAllContainers(){
        return containerRepository.findAll();
    }

    public Container findContainerById(Long id){
        return containerRepository.findById(id).orElse(null);
    }

    public Container findContainerByName(String name){
        return containerRepository.findByName(name).orElse(null);
    }

    public Container saveContainer(Container container){
        return containerRepository.save(container);
    }
}
