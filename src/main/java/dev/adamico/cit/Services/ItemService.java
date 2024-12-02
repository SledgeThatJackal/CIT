package dev.adamico.cit.Services;

import dev.adamico.cit.DTO.ItemFormDTO;
import dev.adamico.cit.Filtering.ItemSpecification;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Repositories.ItemRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemAttributeService itemAttributeService;

    public List<Item> findAllItems(){
        return itemRepository.findAll(Sort.by("id"));

    }

    public Item findItemById(Long id){
        return itemRepository.findById(id).orElse(null);
    }

    @Transactional
    public void createItem(ItemFormDTO dto){
        Item item = dto.getItem();
        List<ItemFormDTO.Attribute> itemAttributes = dto.getItemAttributes();

        boolean hasDuplicates = dto.getItemAttributes().stream().anyMatch(ItemFormDTO.Attribute::getDuplicate);

        if(hasDuplicates){
            processItemAttributes(item, itemAttributes, 0);
        } else {
            if(item.getContainerItems() != null){
                item.getContainerItems().forEach(containerItem -> containerItem.setItem(item));
            }

            saveItems(item, itemAttributes);
        }
    }

    @Transactional
    public void processItemAttributes(Item item, @NonNull List<ItemFormDTO.Attribute> itemAttributes, int index){
        List<String> attrValues = new ArrayList<>();
        ItemFormDTO.Attribute currentAttribute = itemAttributes.get(index);
        String dataType = currentAttribute.getTypeAttribute().getDataType().toString();

        String originalValue = dataType.equalsIgnoreCase("STRING") ? currentAttribute.getStringValue() : currentAttribute.getNumberValue();

        if(currentAttribute.getDuplicate()){
            attrValues.addAll(List.of(originalValue.split("\\|")));
        } else {
            attrValues.add(originalValue);
        }

        attrValues.forEach(currentValue -> {
            if (dataType.equals("STRING")) {
                currentAttribute.setStringValue(currentValue);
            } else {
                currentAttribute.setNumberValue(currentValue);
            }

            if(index < itemAttributes.size() - 1){
                processItemAttributes(item, itemAttributes, index + 1);
            } else {
                saveItems(new Item(item), new ArrayList<>(itemAttributes));
            }
        });

        if (dataType.equalsIgnoreCase("STRING")) {
            currentAttribute.setStringValue(originalValue);
        } else {
            currentAttribute.setNumberValue(originalValue);
        }
    }

    @Transactional
    public void saveItems(Item item, List<ItemFormDTO.Attribute> itemAttributes){
        Long id = itemRepository.save(item).getId();

        itemAttributeService.updateItemAttributes(id, itemAttributes);
    }

    public void saveItem(Item item){
        if(item.getContainerItems() != null){
            for(ContainerItem containerItem : item.getContainerItems()){
                containerItem.setItem(item);
            }
        }

        itemRepository.save(item);
    }

    public void deleteItem(Long id){
        itemRepository.deleteById(id);
    }

    public Page<Item> filterItemPages(int page, int size, Map<String, String> filters){
        final Pageable pageable = PageRequest.of(page, size);

        // Return all items, if there's no filter present
        if(filters == null || filters.isEmpty()){
            return itemRepository.findAll(pageable);
        }

        Specification<Item> itemSpecification = ItemSpecification.withFilters(filters);

        return itemRepository.findAll(itemSpecification, pageable);
    }
}
