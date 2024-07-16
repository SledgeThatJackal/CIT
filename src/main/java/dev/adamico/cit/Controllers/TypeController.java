package dev.adamico.cit.Controllers;

import dev.adamico.cit.Services.ItemTypeValueService;
import dev.adamico.cit.Services.TypeAttributeService;
import dev.adamico.cit.Services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/type")
public class TypeController {
    @Autowired
    private TypeService typeService;

    @Autowired
    private TypeAttributeService typeAttributeService;

    @Autowired
    private ItemTypeValueService itemTypeValueService;


}
