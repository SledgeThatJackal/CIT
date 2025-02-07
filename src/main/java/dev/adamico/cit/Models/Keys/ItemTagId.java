package dev.adamico.cit.Models.Keys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemTagId implements Serializable {
    private Long itemId;
    private Long tagId;
}
