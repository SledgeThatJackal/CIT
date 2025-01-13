package dev.adamico.cit.Services;

import dev.adamico.cit.CustomMultipartFile;
import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerImage;
import dev.adamico.cit.Models.Image;
import dev.adamico.cit.Repositories.ContainerImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class ZipImageService {
    @Autowired
    ImageService imageService;

    @Autowired
    ContainerService containerService;

    @Autowired
    ContainerImageRepository containerImageRepository;

    public void handleZipFile(MultipartFile file) throws Exception {
        if(file.isEmpty()) return;

        try{
            InputStream is = file.getInputStream();
            ZipInputStream zis = new ZipInputStream(is);
            List<MultipartFile> imageFiles = new ArrayList<>();

            ZipEntry entry = new ZipEntry("_");

            String previousDirectory = "";
            String currentDirectory = "";

            String fileName;

            while(entry != null){
                entry = zis.getNextEntry();

                fileName = "";

                if(entry != null){
                    String[] path = entry.getName().split("/");

                    currentDirectory = path[0];
                    fileName = path[1];

                    if(previousDirectory.isEmpty()) previousDirectory = currentDirectory;
                }

                if((entry == null || !previousDirectory.equals(currentDirectory)) && !imageFiles.isEmpty()) {
                    createContainerAndImages(previousDirectory, imageFiles);
                    imageFiles = new ArrayList<>();

                    previousDirectory = currentDirectory;
                }

                if(isImage(fileName)){
                    byte[] image = readData(zis);

                    imageFiles.add(new CustomMultipartFile(image, fileName));
                }

                zis.closeEntry();
            }
        } catch(Exception e){
            throw new Exception(e);
        }
    }

    private void createContainerAndImages(String scannerId, List<MultipartFile> imageFiles) throws Exception {
        Container container = containerService.findContainerByScannerId(scannerId).orElse(new Container(null, scannerId, "", scannerId, null, null, null, null));

        List<Image> images = imageService.createImage(imageFiles);
        AtomicInteger index = new AtomicInteger();

        List<ContainerImage> containerImages = images.stream().map(image -> new ContainerImage(null, container, image, index.getAndIncrement())).toList();

        container.setImages(containerImages);

        containerService.saveContainer(container);
    }

    private boolean isImage(String name){
        return name.endsWith(".jpg") || name.endsWith(".png");
    }

    private byte[] readData(ZipInputStream zis) throws Exception {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int bytesRead;

        while((bytesRead = zis.read(buffer)) != -1){
            outputStream.write(buffer, 0, bytesRead);
        }

        return outputStream.toByteArray();
    }

    @Transactional
    public void deleteImages(List<ContainerImage> containerImages){
        containerImageRepository.deleteAll(containerImages);
    }
}
