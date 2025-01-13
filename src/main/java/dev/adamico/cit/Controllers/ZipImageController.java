package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.ContainerImage;
import dev.adamico.cit.Services.ZipImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/zip")
public class ZipImageController {
    @Autowired
    ZipImageService zipImageService;

    @PostMapping
    public void zipCreateContainers(@RequestParam("file") MultipartFile file) throws Exception {
        zipImageService.handleZipFile(file);
    }

    @PostMapping("/delete")
    public void deleteImages(@RequestBody List<ContainerImage> containerImages){
        zipImageService.deleteImages(containerImages);
    }
}
