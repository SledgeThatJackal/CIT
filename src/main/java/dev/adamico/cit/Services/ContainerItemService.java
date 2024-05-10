package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
