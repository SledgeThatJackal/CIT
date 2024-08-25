package dev.adamico.cit.DTOs;

import dev.adamico.cit.Models.Item;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ItemDTO{
    private Item item;
    private List<LinkDTO> links;
}