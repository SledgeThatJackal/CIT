package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.Image;
import dev.adamico.cit.Services.ImageService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping
    @JsonView(Views.Basic.class)
    public List<Image> fetchImages(){
      return imageService.getImages();
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<Image> uploadImage(@RequestParam("image") List<MultipartFile> images) throws IOException {
        return imageService.createImage(images);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) throws IOException {
        return imageService.getImage(filename);
    }
}
