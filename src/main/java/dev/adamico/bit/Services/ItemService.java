package dev.adamico.bit.Services;

import dev.adamico.bit.Models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepository;

    public List<Item> findAllItems(){
        return itemRepository.findAll();
    }

    public Item findItemById(Long id){
        return itemRepository.findById(id).orElse(null);
    }

    public Item saveItem(Item item){
        return itemRepository.save(item);
    }
}
