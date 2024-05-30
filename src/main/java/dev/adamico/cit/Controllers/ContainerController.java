package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Services.ContainerService;
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
    public String getContainersPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size,
            Model model){

        findContainerPage(page, size, model);

        return "containers_page";
    }

    @GetMapping("/page")
    public String updateContainers(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "1") int size,
                                   Model model){
        findContainerPage(page, size, model);

        return"fragments/containerTableFragment :: containerTableFragment";
    }

    private void findContainerPage(int page, int size, Model model){
        model.addAttribute("containerPage", containerService.findAllPaginatedContainers(page, size));
        model.addAttribute("objectName", "Container");
    }

    @GetMapping("/create")
    public String getCreatePage(Model model){
        model.addAttribute("container", new Container());
        model.addAttribute("isEdit", false);

        return "create_page";
    }

    @PostMapping("/create")
    public String createContainer(@ModelAttribute("container") Container container){
        containerService.saveContainer(container);

        return "redirect:/container/create";
    }

    @GetMapping("/edit/{id}")
    public String getEditPage(Model model, @PathVariable Long id){
        model.addAttribute("container", containerService.findContainerById(id));
        model.addAttribute("isEdit", true);

        return "create_page";
    }

    @PostMapping("/edit")
    public String editContainer(@ModelAttribute("container") Container container){
        containerService.saveContainer(container);

        return "redirect:/container";
    }

    @GetMapping("/delete/{containerId}")
    public String deleteContainer(@PathVariable Long containerId){
        Container container = containerService.findContainerById(containerId);
        containerService.deleteContainer(container);

        return "redirect:/container";
    }
}
