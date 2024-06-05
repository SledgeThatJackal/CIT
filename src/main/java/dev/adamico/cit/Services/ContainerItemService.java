package dev.adamico.cit.Services;

import dev.adamico.cit.DTOs.ItemDTO;
import dev.adamico.cit.DTOs.LinkDTO;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public void createContainerItemLink(Container container, Item item, Integer quantity){
        ContainerItem containerItem = new ContainerItem(null, container, item, quantity);
        containerItemRepository.save(containerItem);
    }

    public List<LinkDTO> findContainerItemLink(Long itemId){
        Set<ContainerItem> containerItems = containerItemRepository.findByItemId(itemId);
        List<LinkDTO> links = new ArrayList<>();

        containerItems.forEach((containerItem -> {
            links.add(new LinkDTO(containerItem.getContainer().getScannerId(), containerItem.getQuantity()));
        }));

        if(links.isEmpty()){
            links.add(new LinkDTO("", 1));
        }

        return links;
    }

    public void removeContainerItemLink(Long containerItemId){
        Optional<ContainerItem> containerItem = containerItemRepository.findById(containerItemId);

        containerItem.ifPresent(item -> containerItemRepository.delete(item));
    }

    public void changeQuantityAmount(Long linkId, Integer quantity){
        containerItemRepository.findById(linkId).ifPresent(link -> {
            link.setQuantity(quantity);
            containerItemRepository.save(link);
        });
    }

    public Set<Container> findAllAssociatedContainersBasedOnItemId(Long itemId){
        return containerItemRepository.findContainersByItemId(itemId);
    }

    public Page<ItemDTO> findPaginatedItemsWithContainers(int page, int size, String search){
        Pageable pageable = PageRequest.of(page, size);
        Page<Item> itemPage;

        if(search.isEmpty()){
            itemPage = itemRepository.findAll(pageable);
        } else {
            itemPage = itemRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search, pageable);
        }

        List<ItemDTO> itemDTOS = new ArrayList<>();

        for(Item item: itemPage){
            Set<Container> containers = containerItemRepository.findContainersByItemId(item.getId());
            ItemDTO itemDTO = new ItemDTO(item, containers);

            itemDTOS.add(itemDTO);
        }

        return new PageImpl<>(itemDTOS, pageable, itemPage.getTotalElements());
    }
}
