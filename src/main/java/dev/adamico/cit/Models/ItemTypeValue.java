package dev.adamico.cit.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "itemtypevalue_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemTypeValue {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "typeAttributeId")
    private TypeAttribute typeAttribute;

    @Column(name = "value", nullable = false)
    private String value;
}
