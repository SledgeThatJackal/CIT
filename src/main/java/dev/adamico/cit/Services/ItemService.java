package dev.adamico.cit.Services;

import dev.adamico.cit.DTO.ItemFormDTO;
import dev.adamico.cit.DTO.ItemQueryRequest;
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

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.domain.Sort.by;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemAttributeService itemAttributeService;

    public List<Item> findAllItems(){
        return itemRepository.findAll(by("id"));

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

    public Page<Item> filterItemPages(ItemQueryRequest itemQueryRequest){


        final Pageable pageable = PageRequest.of(itemQueryRequest.getPage(),
                                                 itemQueryRequest.getSize(),
                                                 createPageSort(itemQueryRequest.getSortColumns()));

        // Return all items, if there's no filter present
        if(itemQueryRequest.getFilterColumns().isEmpty() && itemQueryRequest.getSortColumns().isEmpty()){
            return itemRepository.findAll(pageable);
        }

        Specification<Item> itemSpecification = ItemSpecification.withFilters(itemQueryRequest.getFilterColumns(), itemQueryRequest.getSortColumns());

        return itemRepository.findAll(itemSpecification, pageable);
    }

    private Sort createPageSort(List<ItemQueryRequest.SortColumn> sortColumns){
        List<Sort.Order> orders = new ArrayList<>();

        for(ItemQueryRequest.SortColumn currentSort: sortColumns){
//            if(currentSort.getColumnLabel().contains("typeAttribute")) sortByInnerValue(currentSort);
            if(currentSort.getColumnLabel().contains("typeAttribute")) continue;

            orders.add(new Sort.Order(currentSort.getDirection(), currentSort.getColumnLabel()));
        }

        return orders.isEmpty() ? Sort.unsorted() : Sort.by(orders);
    }

//    private Sort sortByInnerValue(ItemQueryRequest.SortColumn currentSort){
//        Long id = Long.valueOf(currentSort.getColumnLabel().split("-")[1]);
//
//        Comparator<Item> comparator = ((Comparator<Item>) (o1, o2) -> {
//            ItemAttribute ia1 = o1.getItemAttributes().stream().filter(itemAttribute -> Objects.equals(itemAttribute.getTypeAttribute().getId(), id)).findFirst().orElse(null);
//            ItemAttribute ia2 = o2.getItemAttributes().stream().filter(itemAttribute -> Objects.equals(itemAttribute.getTypeAttribute().getId(), id)).findFirst().orElse(null);
//
//            if(ia1 == null && ia2 == null) return 0;
//            if(ia1 == null) return 1;
//            if(ia2 == null) return -1;
//
//            String type = ia1.getTypeAttribute().getDataType().toString();
//            int value;
//
//            if(type.equalsIgnoreCase("STRING")){
//                value = ia1.getStringValue().compareTo(ia2.getStringValue());
//            } else {
//                value = ia1.getNumberValue().compareTo(ia2.getNumberValue());
//            }
//
//            return value;
//        });
//
//        return Sort.TypedSort.by();
//    }
}
