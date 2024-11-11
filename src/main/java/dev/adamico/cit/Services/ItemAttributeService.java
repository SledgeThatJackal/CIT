package dev.adamico.cit.Services;

import dev.adamico.cit.Models.ItemAttribute;
import dev.adamico.cit.Repositories.ItemAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemAttributeService {
    @Autowired
    private ItemAttributeRepository itemAttributeRepository;

    public List<ItemAttribute> findByItemId(Long id){
        return itemAttributeRepository.findByItemId(id);
    }

    public void saveItemAttribute(ItemAttribute itemAttribute){
        itemAttributeRepository.save(itemAttribute);
    }

    public void deleteItemAttribute(Long id){
        itemAttributeRepository.deleteById(id);
    }
}
