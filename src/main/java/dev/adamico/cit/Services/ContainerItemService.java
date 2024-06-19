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

    public void createContainerItemLink(List<LinkDTO> links, Item item){
        links.forEach(link -> {
            createContainerItemLink(link, item);
        });
    }

    public void createContainerItemLink(LinkDTO link, Item item){
        Optional<Container> optionalContainer = containerRepository.findByScannerId(link.getScannerId());

        optionalContainer.ifPresent(container -> {
            containerItemRepository.save(new ContainerItem(null, container, item, link.getQuantity()));
        });
    }

    public List<LinkDTO> findContainerItemLink(Long itemId){
        Set<ContainerItem> containerItems = containerItemRepository.findByItemId(itemId);
        List<LinkDTO> links = new ArrayList<>();

        containerItems.forEach((containerItem -> {
            links.add(new LinkDTO(containerItem.getContainer().getScannerId(), containerItem.getQuantity(), containerItem.getId()));
        }));

        if(links.isEmpty()){
            links.add(new LinkDTO("", 1, null));
        }

        return links;
    }

    public void removeContainerItemLink(Long containerItemId){
        containerItemRepository.deleteById(containerItemId);
    }

    public void changeQuantityAmount(List<LinkDTO> links, Item item){
        for(LinkDTO link : links){
            if(link.getLinkId() == null){
                createContainerItemLink(link, item);
            } else {
                containerItemRepository.updateQuantityById(link.getQuantity(), link.getLinkId());
            }
        }
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
