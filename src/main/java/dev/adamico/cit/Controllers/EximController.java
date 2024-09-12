package dev.adamico.cit.Controllers;

import dev.adamico.cit.Services.ContainerItemService;
import dev.adamico.cit.Services.ContainerService;
import dev.adamico.cit.Services.EximService;
import dev.adamico.cit.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exim")
public class EximController { // EXport IMport
    @Autowired
    ItemService itemService;

    @Autowired
    ContainerService containerService;

    @Autowired
    ContainerItemService containerItemService;

    @Autowired
    EximService eximService;

    @GetMapping("/export")
    public ResponseEntity<Resource> exportData() throws Exception {
        Resource resource = eximService.exportDatabase();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setContentDispositionFormData("attachment", "cit_data.json");

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }


}
