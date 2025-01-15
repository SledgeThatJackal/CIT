package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Models.Tag;
import dev.adamico.cit.Services.ItemService;
import dev.adamico.cit.Services.TagService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @Autowired
    private ItemService itemService;

    @GetMapping
    @JsonView(Views.Basic.class)
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
        Tag tag = tagService.findTagById(id);
        for(Item item: tag.getItem()){
            item.getTags().remove(tag);
        }

        tagService.deleteTag(id);
    }
}
