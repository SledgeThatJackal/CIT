package dev.adamico.cit.Services;

import dev.adamico.cit.DTO.TypeFormDTO;
import dev.adamico.cit.Models.ItemType;
import dev.adamico.cit.Models.TypeAttribute;
import dev.adamico.cit.Repositories.ItemTypeRepository;
import dev.adamico.cit.Repositories.TypeAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ItemTypeService {
    @Autowired
    private ItemTypeRepository itemTypeRepository;

    @Autowired
    private TypeAttributeRepository typeAttributeRepository;

    public Optional<ItemType> findById(Long id){
        return itemTypeRepository.findById(id);
    }

    public List<ItemType> findAll(){
        return itemTypeRepository.findAll();
    }

    @Transactional
    public Long createType(TypeFormDTO typeFormDTO){
        ItemType itemType = itemTypeRepository.save(typeFormDTO.getItemType());
        List<TypeAttribute> typeAttributes = typeFormDTO.getTypeAttributes();

        typeAttributes.forEach(typeAttribute -> typeAttribute.setItemType(itemType));
        typeAttributeRepository.saveAll(typeAttributes);

        return itemType.getId();
    }

    public void saveType(ItemType itemType){
        itemTypeRepository.save(itemType);
    }

    public void deleteType(Long id){
        itemTypeRepository.deleteById(id);
    }
}

