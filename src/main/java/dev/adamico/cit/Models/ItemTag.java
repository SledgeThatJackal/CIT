package dev.adamico.cit.Models;

import dev.adamico.cit.Models.Keys.ItemTagId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@IdClass(ItemTagId.class)
@NoArgsConstructor
@AllArgsConstructor
public class ItemTag {
    @Id
    @Column(name = "item_id")
    private Long itemId;

    @Id
    @Column(name = "tag_id")
    private Long tagId;
}
