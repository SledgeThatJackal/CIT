package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Services.ContainerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
        model.addAttribute("objectName", "Container");

        return "containers_page";
    }

    @GetMapping("/page")
    @ResponseBody
    public Page<Container> updateContainers(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "1") int size){

        return containerService.findAllPaginatedContainers(page, size);
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
