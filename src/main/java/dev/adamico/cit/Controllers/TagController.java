package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Tag;
import dev.adamico.cit.Services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping
    public List<Tag> getTags(){
        return tagService.fetchTags();
    }

    @PostMapping("/create")
    public Tag createTag(@RequestBody Tag tag){
        return tagService.createTag(tag);
    }

    @PutMapping("/edit")
    public Tag editTag(@RequestBody Tag tag){
        return tagService.createTag(tag);
    }

    @DeleteMapping("/delete")
    public void deleteTag(@RequestParam Long id){
        tagService.deleteTag(id);
    }
}
