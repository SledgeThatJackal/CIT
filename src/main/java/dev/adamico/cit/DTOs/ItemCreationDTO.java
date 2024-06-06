package dev.adamico.cit.DTOs;

import dev.adamico.cit.Models.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemCreationDTO {
    private Item item;
    private List<LinkDTO> links;
}
