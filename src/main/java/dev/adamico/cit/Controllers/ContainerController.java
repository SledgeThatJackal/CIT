package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Services.ContainerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/container")
public class ContainerController {
    @Autowired
    private ContainerService containerService;

    @GetMapping
    public String getContainersPage(Model model){
        model.addAttribute("containers", containerService.findAllContainers());

        return "containers_page";
    }

    @GetMapping("/create")
    public String getCreatePage(Model model){
        model.addAttribute("newContainer", new Container());

        return "create_page";
    }

    @GetMapping("/edit/{id}")
    public String getEditPage(Model model, @PathVariable Long id){
        model.addAttribute("container", containerService.findContainerById(id));

        return "edit_page";
    }

    @PostMapping("/update")
    @Transactional
    public String updateContainer(@ModelAttribute("container") Container container){
        containerService.saveContainer(container);

        return "redirect:/container";
    }
}
