package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Image;
import dev.adamico.cit.Repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@Service
public class ImageService {
    @Value("${IMAGES_ENVIRONMENT_PATH}")
    private String imageDirectory;

    @Autowired
    private ImageRepository imageRepository;

    public List<Image> createImage(List<MultipartFile> images) throws IOException {
        if(images.isEmpty()){
            return null;
        }

        File directory = new File(imageDirectory);
        if(!directory.exists()){
            if(!directory.mkdirs()){
                return null;
            }
        }

        return images.stream().map(image -> {
            String filename = Objects.requireNonNull(image.getOriginalFilename()).replaceAll("[^a-zA-Z0-9._-]", "_");

            Path path = Paths.get(imageDirectory, filename);
            try {
                Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            return imageRepository.findImageByFileName(filename).orElseGet(() -> imageRepository.save(new Image(null, filename)));
        }).toList();
    }
}
