package dev.adamico.cit.Controllers;

import dev.adamico.cit.DTOs.ItemCreationDTO;
import dev.adamico.cit.DTOs.ItemDTO;
import dev.adamico.cit.DTOs.LinkDTO;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.ItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
                               @RequestParam(defaultValue = "10") int size,
                               @RequestParam(defaultValue = "") String search,
                               Model model){
        Page<ItemDTO> itemPage = containerItemService.findPaginatedItemsWithContainers(page, size, search);
        model.addAttribute("itemPage", itemPage);
        model.addAttribute("objectName", "Item");
        model.addAttribute("search", search);

        return "items_page";
    }

    @GetMapping("/page")
    @ResponseBody
    public Page<ItemDTO> updateItems(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size,
                                     @RequestParam(defaultValue = "") String search){

        return containerItemService.findPaginatedItemsWithContainers(page, size, search);
    }

    @GetMapping("/create")
    public String getCreatePage(Model model){
        ItemCreationDTO itemCreationDTO = new ItemCreationDTO(new Item(), containerItemService.findContainerItemLink(null));

        model.addAttribute("itemCreationDTO", itemCreationDTO);
        model.addAttribute("isEdit", false);

        return "create_page";
    }

    @PostMapping("/create")
    public String createItem(@ModelAttribute("itemCreationDTO") ItemCreationDTO itemCreationDTO){
        Item item = itemCreationDTO.getItem();
        List<LinkDTO> links = itemCreationDTO.getLinks();

        itemService.saveItem(item);
        containerItemService.createContainerItemLink(links, item);

        return "redirect:/item/create";
    }

    @GetMapping("/edit/{id}")
    public String getEditPage(Model model, @PathVariable Long id){
        ItemCreationDTO itemCreationDTO = new ItemCreationDTO(itemService.findItemById(id), containerItemService.findContainerItemLink(id));

        model.addAttribute("itemCreationDTO", itemCreationDTO);
        model.addAttribute("isEdit", true);

        return "create_page";
    }

    @PostMapping("/edit")
    @Transactional
    public String editItem(@ModelAttribute("itemCreationDTO") ItemCreationDTO itemCreationDTO){
        Item item = itemService.saveItem(itemCreationDTO.getItem());
        List<LinkDTO> links = itemCreationDTO.getLinks();

        containerItemService.changeQuantityAmount(links, item);

        return "redirect:/item";
    }

    @GetMapping("/delete/{itemId}")
    @Transactional
    public String deleteItem(@PathVariable Long itemId){
        Item item = itemService.findItemById(itemId);
        itemService.deleteItem(item);

        return "redirect:/item";
    }

    @PostMapping("/delete-link")
    @Transactional
    public ResponseEntity<String> deleteLink(@RequestBody Long id){
        containerItemService.removeContainerItemLink(id);

        return new ResponseEntity<>("Request processed successfully", HttpStatus.OK);
    }
}