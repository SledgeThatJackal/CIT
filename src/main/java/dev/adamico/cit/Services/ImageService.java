package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Image;
import dev.adamico.cit.Models.Views.ImageFind;
import dev.adamico.cit.Repositories.ImageFindCustomRepositoryImpl;
import dev.adamico.cit.Repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @Value("${ENVIRONMENT}")
    private String env;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageFindCustomRepositoryImpl imageFindRepository;

    public List<Image> getImages(){
        return imageRepository.findAll();
    }

    public ResponseEntity<Resource> getImage(String filename) throws IOException {
        File file;

        if(env.equalsIgnoreCase("local")){
            file = new File(imageDirectory + "\\" + filename);
        } else{
            file = new File(imageDirectory + "/" + filename);
        }

        if(!file.exists() || file.isDirectory()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        String contentType = Files.probeContentType(file.toPath());
        if(contentType == null){
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        Resource image = new FileSystemResource(file);

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, contentType).body(image);
    }

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

    public List<ImageFind> findImages(String containerName, String scannerId, String itemName){
        return imageFindRepository.findByContainerOrItemName(containerName, scannerId, itemName);
    }

    public Integer findTotal(){
        return imageFindRepository.count();
    }
}
