package dev.adamico.cit.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContainerDTO {
    private String name;
    private String scannerId;
}
