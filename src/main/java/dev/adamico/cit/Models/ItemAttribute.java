package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "itemattributes_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Exclusive.class)
public class ItemAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "typeattr_id", nullable = false)
    private TypeAttribute typeAttribute;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    private String value;

    @Override
    public String toString() {
        return "ItemAttribute{" +
                "id=" + id +
                ", typeAttributes=" + typeAttribute +
                ", item=" + item +
                ", value='" + value + '\'' +
                '}';
    }
}
