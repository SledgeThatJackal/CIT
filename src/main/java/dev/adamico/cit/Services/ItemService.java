package dev.adamico.cit.Services;

import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepository;

    public List<Item> findAllItems(){
        return itemRepository.findAll(Sort.by("id"));

    }

    public Item findItemById(Long id){
        return itemRepository.findById(id).orElse(null);
    }

    public Item saveItem(Item item){
        if(item.getContainerItems() != null){
            for(ContainerItem containerItem : item.getContainerItems()){
                containerItem.setItem(item);
            }
        }

        return itemRepository.save(item);
    }

    public void deleteItem(Long id){
        itemRepository.deleteById(id);
    }

    public Page<Item> searchItems(int page, int size, String search){
        final Pageable pageable = PageRequest.of(page, size);
        final Page<Long> itemIds = itemRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search, pageable);

        final Set<Long> ids = Set.copyOf(itemIds.getContent());
        final List<Item> items = itemRepository.findByIdIn(ids);

        return new PageImpl<>(items, pageable, itemIds.getTotalElements());
    }
}
