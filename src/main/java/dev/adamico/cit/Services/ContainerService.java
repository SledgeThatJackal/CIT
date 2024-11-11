package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Repositories.ContainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ContainerService {
    @Autowired
    ContainerRepository containerRepository;

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

    public Container findContainerByScannerId(String scannerId){
        return containerRepository.findByScannerId(scannerId).orElse(null);
    }

    public void saveContainer(Container container){
        containerRepository.save(container);
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
