package dev.adamico.cit.DTOs;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.Item;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class ItemDTO{
    private Item item;
    private Set<Container> containers;
}