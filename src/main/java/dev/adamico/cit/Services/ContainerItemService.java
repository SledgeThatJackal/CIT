package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ContainerItemService {
    @Autowired
    private ContainerItemRepository containerItemRepository;

    @Autowired
    private ContainerRepository containerRepository;

    @Autowired
    private ItemRepository itemRepository;

    public void createContainerItemLink(Long containerId, Long itemId, Integer quantity){
        Container container = containerRepository.findById(containerId).orElse(null);
        Item item = itemRepository.findById(itemId).orElse(null);

        ContainerItem containerItem = new ContainerItem();
        containerItem.setContainer(container);
        containerItem.setItem(item);
        containerItem.setQuantity(quantity);

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
}
