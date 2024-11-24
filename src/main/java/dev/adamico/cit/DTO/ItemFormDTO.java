package dev.adamico.cit.DTO;

import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Models.TypeAttribute;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemFormDTO {
    private Item item;

    private List<Attribute> itemAttributes;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Attribute {
        private TypeAttribute typeAttribute;
        private String value;
        private Boolean duplicate;

        @Override
        public String toString() {
            return "Attribute{" +
                    "typeAttribute=" + typeAttribute +
                    ", value='" + value + '\'' +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "ItemFormDTO{" +
                "item=" + item +
                ", itemAttributes=" + itemAttributes +
                '}';
    }
}
