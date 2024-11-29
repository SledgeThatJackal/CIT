package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Repositories.ContainerItemRepository;
import dev.adamico.cit.Repositories.ContainerRepository;
import dev.adamico.cit.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ContainerItemService {
    @Autowired
    private ContainerItemRepository containerItemRepository;

    @Autowired
    private ContainerRepository containerRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Transactional
    public void createLink(Long itemId, Long containerId, Integer quantity){
        Optional<Item> item = itemRepository.findById(itemId);
        Optional<Container> container = containerRepository.findById(containerId);

        if(item.isPresent() && container.isPresent()){
            ContainerItem containerItem = new ContainerItem(null, container.get(), item.get(), quantity);
            containerItemRepository.save(containerItem);
        } else {
            throw new NoSuchElementException("Item and/or Container do not exist");
        }
    }

    @Transactional
    public void updateQuantity(Integer quantity, Long id){
        containerItemRepository.updateQuantityById(quantity, id);
    }

    @Transactional
    public void removeContainerItemLink(Long containerItemId){
        containerItemRepository.deleteById(containerItemId);
    }
}
