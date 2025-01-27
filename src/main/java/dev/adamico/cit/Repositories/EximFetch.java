package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EximFetch {
    @Autowired
    ItemTypeRepository itemTypeRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    SettingsRepository settingsRepository;

    @Autowired
    ContainerRepository containerRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    TypeAttributeRepository typeAttributeRepository;

    @Autowired
    ItemTagRepository itemTagRepository;

    @Autowired
    ItemImageRepository itemImageRepository;

    @Autowired
    ContainerImageRepository containerImageRepository;

    @Autowired
    ContainerItemRepository containerItemRepository;

    @Autowired
    ItemAttributeRepository itemAttributeRepository;



    public JpaRepository fetchRepository(String tableName){
        return switch(tableName) {
            case "itemtype_table" -> itemTypeRepository;
            case "tags_table" -> tagRepository;
            case "images_table" -> imageRepository;
            case "settings_table" -> settingsRepository;
            case "container_table" -> containerRepository;
            case "item_table" -> itemRepository;
            case "typeattributes_table" -> typeAttributeRepository;
            case "itemtag_table" -> itemTagRepository;
            case "itemimages_table" -> itemImageRepository;
            case "containerimages_table" -> containerImageRepository;
            case "containeritem_table" -> containerItemRepository;
            case "itemattributes_table" -> itemAttributeRepository;

            default -> null;
        };
    }

    public Class<?> fetchClass(String tableName){
        return Map.ofEntries(
                Map.entry("itemtype_table", ItemType.class),
                Map.entry("tags_table", Tag.class),
                Map.entry("images_table", Image.class),
                Map.entry("settings_table", Setting.class),
                Map.entry("container_table", Container.class),
                Map.entry("item_table", Item.class),
                Map.entry("typeattributes_table", TypeAttribute.class),
                Map.entry("itemtag_table", ItemTag.class),
                Map.entry("itemimages_table", ItemImage.class),
                Map.entry("containerimages_table", ContainerImage.class),
                Map.entry("containeritem_table", ContainerItem.class),
                Map.entry("itemattributes_table", ItemAttribute.class)
        ).get(tableName);
    }
}
