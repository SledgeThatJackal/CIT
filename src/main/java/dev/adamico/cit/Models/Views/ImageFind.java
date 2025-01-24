package dev.adamico.cit.Models.Views;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "image_find")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageFind {
    @Column(name = "scanner_id")
    private String scannerId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "file_name")
    private String fileName;
}
