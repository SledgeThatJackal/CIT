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
    public Tag createTag(@RequestBody Tag tag){
        return tagService.createTag(tag);
    }

    @DeleteMapping("/delete")
    public void deleteTag(@RequestParam Long id){
        tagService.deleteTag(id);
    }
}
