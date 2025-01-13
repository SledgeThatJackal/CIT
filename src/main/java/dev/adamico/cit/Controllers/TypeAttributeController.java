package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.TypeAttribute;
import dev.adamico.cit.Services.TypeAttributeService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attribute/type")
public class TypeAttributeController {
    @Autowired
    private TypeAttributeService typeAttributeService;

    @GetMapping
    @JsonView(Views.Basic.class)
    public List<TypeAttribute> getTypeAttributes(){
        return typeAttributeService.findAll();
    }

    @GetMapping("/id")
    @JsonView(Views.Basic.class)
    public List<TypeAttribute> getTypeAttributesById(@RequestParam("id") Long id){
        return typeAttributeService.findByTypeId(id);
    }

    @PostMapping("/create")
    public void createTypeAttribute(@RequestBody TypeAttribute typeAttribute){
        typeAttributeService.saveTypeAttribute(typeAttribute);
    }

    @PutMapping("/edit")
    public void editTypeAttribute(@RequestBody TypeAttribute typeAttribute){
        typeAttributeService.saveTypeAttribute(typeAttribute);
    }

    @DeleteMapping("/delete")
    public void deleteTypeAttribute(@RequestParam("id") Long id){
        typeAttributeService.deleteTypeAttribute(id);
    }
}
