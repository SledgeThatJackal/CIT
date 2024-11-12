package dev.adamico.cit.Services;

import dev.adamico.cit.Models.ItemType;
import dev.adamico.cit.Repositories.ItemTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemTypeService {
    @Autowired
    private ItemTypeRepository itemTypeRepository;

    public Optional<ItemType> findById(Long id){
        return itemTypeRepository.findById(id);
    }

    public List<ItemType> findAll(){
        return itemTypeRepository.findAll();
    }

    public void saveType(ItemType itemType){
        itemTypeRepository.save(itemType);
    }

    public void deleteType(Long id){
        itemTypeRepository.deleteById(id);
    }
}

