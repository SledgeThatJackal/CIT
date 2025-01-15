package dev.adamico.cit;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@AllArgsConstructor
public class CustomMultipartFile implements MultipartFile {
    private byte[] content;
    private String fileName;

    @Nonnull
    @Override
    public String getName() {
        return fileName;
    }

    @Nonnull
    @Override
    public String getOriginalFilename() {
        return fileName;
    }

    @Nonnull
    @Override
    public String getContentType() {
        return "application/octet-stream";
    }

    @Override
    public boolean isEmpty() {
        return content == null || content.length == 0;
    }

    @Override
    public long getSize() {
        return content.length;
    }

    @Nonnull
    @Override
    public byte[] getBytes() throws IOException {
        return content;
    }

    @Nonnull
    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(content);
    }

    @Override
    public void transferTo(@Nonnull File dest) throws IOException, IllegalStateException {
        try(FileOutputStream fos = new FileOutputStream(dest)){
            fos.write((content));
        }
    }
}
