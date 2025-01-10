package dev.adamico.cit.Controllers;

import dev.adamico.cit.Services.BulkImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bulk")
public class BulkImageController {
    @Autowired
    BulkImageService bulkImageService;

    @PostMapping
    public void bulkCreateContainers(@RequestParam("file") MultipartFile file) throws Exception {
        bulkImageService.handleZipFile(file);
    }


}
