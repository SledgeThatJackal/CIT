package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Controller
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private ContainerService containerService;

    @Autowired
    private ContainerItemService containerItemService;

    @GetMapping
    public String getItemsPage(Model model){
        List<Item> items = itemService.findAllItems();
        List<ItemDTO> itemList = new ArrayList<>();

        items.forEach(item -> {
            Set<Container> containers = containerItemService.findAllAssociatedContainersBasedOnItemId(item.getId());
            ItemDTO itemContainers = new ItemDTO(item, containers);

            itemList.add(itemContainers);
        });

        model.addAttribute("itemDTOs", itemList);
        model.addAttribute("objectName", "Item");

        return "items_page";
    }

    @GetMapping("/create")
    public String getCreatePage(Model model){
        model.addAttribute("newItem", new Item());
        model.addAttribute("isEdit", false);

        return "create_page";
    }

    @PostMapping("/create")
    public String createItem(@ModelAttribute("item") Item item,
                             @RequestParam String containerScannerId,
                             @RequestParam Integer quantity){
        itemService.saveItem(item);

        if(quantity == null){
            return "redirect:/item/create";
        }

        Container container = containerService.findContainerByScannerId(containerScannerId);

        if(container != null){
            containerItemService.createContainerItemLink(containerScannerId, item, quantity);
        }

        return "redirect:/item/create";
    }

    @GetMapping("/edit/{id}")
    public String getEditPage(Model model, @PathVariable Long id){
        model.addAttribute("item", itemService.findItemById(id));
        model.addAttribute("isEdit", true);

        return "create_page";
    }

    @PostMapping("/edit")
    @Transactional
    public String editItem(@ModelAttribute("item") Item item){
        itemService.saveItem(item);

        return "create_page";
    }

    @GetMapping("/delete/{itemId}")
    @Transactional
    public String deleteItem(@PathVariable Long itemId){
        Item item = itemService.findItemById(itemId);
        itemService.deleteItem(item);

        return "redirect:/item";
    }
}

@Data
@AllArgsConstructor
class ItemDTO{
    private Item item;
    private Set<Container> containers;
}