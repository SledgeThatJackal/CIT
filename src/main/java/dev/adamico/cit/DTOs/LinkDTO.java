package dev.adamico.cit.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LinkDTO {
    private Long linkId;
    private Integer quantity;
    private String name;
    private String scannerId;
}