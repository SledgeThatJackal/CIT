package dev.adamico.cit.Services;

import dev.adamico.cit.DTOs.ItemDTO;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public void createContainerItemLink(String scannerId, Item item, Integer quantity){
        Container container = containerRepository.findByScannerId(scannerId).orElse(null);

        if(container == null){
            return;
        }

        ContainerItem containerItem = new ContainerItem(null, container, item, quantity);
        containerItemRepository.save(containerItem);
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

    public Page<ItemDTO> findPaginatedItemsWithContainers(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Item> itemPage = itemRepository.findAll(pageable);

        List<ItemDTO> itemDTOS = new ArrayList<>();

        for(Item item: itemPage){
            Set<Container> containers = containerItemRepository.findContainersByItemId(item.getId());
            ItemDTO itemDTO = new ItemDTO(item, containers);

            itemDTOS.add(itemDTO);
        }

        return new PageImpl<>(itemDTOS, pageable, itemPage.getTotalElements());
    }
}
