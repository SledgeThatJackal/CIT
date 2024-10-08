package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Tag;
import dev.adamico.cit.Repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    public List<Tag> fetchTags(){
        return tagRepository.findAll();
    }

    public Tag createTag(Tag tag){
        return tagRepository.save(tag);
    }

    public Tag findTagById(Long id){
        return tagRepository.findById(id).orElse(null);
    }

    public void deleteTag(Long id){
        tagRepository.deleteById(id);
    }
}
