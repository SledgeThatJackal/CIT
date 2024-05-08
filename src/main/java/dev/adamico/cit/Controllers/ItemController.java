package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Services.ItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping
    public String getItemsPage(Model model){
        model.addAttribute("items", itemService.findAllItems());

        return "items_page";
    }

    @GetMapping("/create")
    public String getCreatePage(Model model){
        model.addAttribute("newItem", new Item());

        return "create_page";
    }

    @GetMapping("/edit/{id}")
    public String getEditPage(Model model, @PathVariable Long id){
        model.addAttribute("item", itemService.findItemById(id));

        return "edit_page";
    }

    @PostMapping("/update")
    @Transactional
    public String updateItem(@ModelAttribute("item") Item item){
        itemService.saveItem(item);

        return "redirect:/item";
    }
}
