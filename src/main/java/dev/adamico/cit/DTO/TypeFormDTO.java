package dev.adamico.cit.DTO;

import dev.adamico.cit.Models.ItemType;
import dev.adamico.cit.Models.TypeAttribute;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeFormDTO {
    private ItemType itemType;
    private List<TypeAttribute> typeAttributes;

    @Override
    public String toString() {
        return "TypeFormDTO{" +
                "itemType=" + itemType +
                ", typeAttributes=" + typeAttributes +
                '}';
    }
}
