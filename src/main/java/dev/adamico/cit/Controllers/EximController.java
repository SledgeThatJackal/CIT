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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/exim")
public class EximController { // EXport IMport
    @Autowired
    private ItemService itemService;

    @Autowired
    private ContainerService containerService;

    @Autowired
    private ContainerItemService containerItemService;

    @Autowired
    private EximService eximService;

    @GetMapping("/export")
    public ResponseEntity<Resource> exportData() throws Exception {
        Resource resource = eximService.exportDatabase();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setContentDispositionFormData("attachment", "cit_data.json");

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @PostMapping("/import")
    public void importData(@RequestParam("file") MultipartFile file) throws Exception {
        eximService.importData(file);
    }
}
