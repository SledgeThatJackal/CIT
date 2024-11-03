package dev.adamico.cit.Services;

import dev.adamico.cit.DTOs.LinkDTO;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Repositories.ContainerItemJdbcRepository;
import dev.adamico.cit.Repositories.ContainerItemRepository;
import dev.adamico.cit.Repositories.ContainerRepository;
import dev.adamico.cit.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ContainerItemService {
    @Autowired
    private ContainerItemRepository containerItemRepository;

    @Autowired
    ContainerItemJdbcRepository containerItemJdbcRepository;

    @Autowired
    private ContainerRepository containerRepository;

    @Autowired
    private ItemRepository itemRepository;

    public void createContainerItemLink(List<LinkDTO> links, Item item){
        links.forEach(link -> {
            if(!link.getScannerId().isEmpty()){
                createContainerItemLink(link, item);
            }
        });
    }

    public void createContainerItemLink(LinkDTO link, Item item) throws NoSuchElementException {
        Optional<Container> optionalContainer = containerRepository.findByScannerId(link.getScannerId());

        optionalContainer.ifPresentOrElse(container -> {
            containerItemRepository.save(new ContainerItem(null, container, item, link.getQuantity()));
        }, () -> {
            throw new NoSuchElementException("Scanner ID: " + link.getScannerId() + " does not exist");
        });
    }

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

    public void removeContainerItemLink(Long containerItemId){
        containerItemRepository.deleteById(containerItemId);
    }

    @Transactional
    public void changeQuantityAmount(List<LinkDTO> links, Item item) throws NoSuchElementException{
        for(LinkDTO link : links){
            if(link.getLinkId() == null){
                if(!link.getScannerId().isEmpty()){
                    createContainerItemLink(link, item);
                }
            } else {
                containerItemRepository.updateQuantityById(link.getQuantity(), link.getLinkId());
            }
        }
    }

    public List<LinkDTO> findAllAssociatedContainersBasedOnItemId(Long itemId){
        return containerItemRepository.findContainersByItemId(itemId);
    }
}
