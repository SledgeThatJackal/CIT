package dev.adamico.cit.Controllers;

import dev.adamico.cit.DTOs.ItemDTO;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    public String getItemsPage(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "2") int size,
                               @RequestParam(defaultValue = "") String search,
                               Model model){
        findItemPage(page, size, search, model);

        return "items_page";
    }

    @GetMapping("/page")
    public String updateItems(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "2") int size,
                              @RequestParam(defaultValue = "") String search,
                               Model model){
        findItemPage(page, size, search, model);

        return "fragments/itemTableFragment::itemTableFragment";
    }

    private void findItemPage(int page, int size, String search, Model model){
        Page<ItemDTO> itemPage = containerItemService.findPaginatedItemsWithContainers(page, size, search);
        model.addAttribute("itemPage", itemPage);
        model.addAttribute("objectName", "Item");
        model.addAttribute("search", search);
    }

    @GetMapping("/create")
    public String getCreatePage(Model model){
        model.addAttribute("item", new Item());
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

        return "redirect:/item";
    }

    @GetMapping("/delete/{itemId}")
    @Transactional
    public String deleteItem(@PathVariable Long itemId){
        Item item = itemService.findItemById(itemId);
        itemService.deleteItem(item);

        return "redirect:/item";
    }
}