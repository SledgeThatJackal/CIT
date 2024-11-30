package dev.adamico.cit.Services;

import dev.adamico.cit.DTO.ItemFormDTO;
import dev.adamico.cit.Models.ItemAttribute;
import dev.adamico.cit.Repositories.ItemAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Service
public class ItemAttributeService {
    @Autowired
    private ItemAttributeRepository itemAttributeRepository;

    public List<ItemAttribute> findByItemId(Long id){
        return itemAttributeRepository.findByItemId(id);
    }

    @Transactional
    public void updateItemAttributes(Long id, List<ItemFormDTO.Attribute> itemAttributes){
        List<ItemAttribute> dbItemAttributes = itemAttributeRepository.findByItemId(id);

        dbItemAttributes.forEach((dbItemAttribute -> {
            Iterator<ItemFormDTO.Attribute> iterator = itemAttributes.iterator();

            while(iterator.hasNext()){
                ItemFormDTO.Attribute attribute = iterator.next();

                if(Objects.equals(attribute.getTypeAttribute().getId(), dbItemAttribute.getTypeAttribute().getId())){
                    switch(dbItemAttribute.getTypeAttribute().getDataType()){
                        case STRING -> dbItemAttribute.setStringValue(attribute.getStringValue());
                        case NUMBER, BOOLEAN -> dbItemAttribute.setNumberValue(Double.valueOf(attribute.getNumberValue()));
                        // List (if implemented)
                    }

                    iterator.remove();
                    break;
                }
            }
        }));

        itemAttributeRepository.saveAll(dbItemAttributes);
    }

    public void saveItemAttribute(ItemAttribute itemAttribute){
        itemAttributeRepository.save(itemAttribute);
    }

    public void deleteItemAttribute(Long id){
        itemAttributeRepository.deleteById(id);
    }
}
