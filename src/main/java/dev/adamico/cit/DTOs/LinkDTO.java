package dev.adamico.cit.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LinkDTO {
    private String scannerId;
    private Integer quantity;
}
