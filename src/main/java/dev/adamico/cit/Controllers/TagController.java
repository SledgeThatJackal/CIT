package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Tag;
import dev.adamico.cit.Services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @PostMapping("/create")
    public void createTag(@RequestBody Tag tag){
        tagService.createTag(tag);
    }

    @DeleteMapping("/delete")
    public void deleteTag(@RequestBody Long id){
        tagService.deleteTag(id);
    }
}
