package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "containeritem_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonView(Views.Basic.class)
public class ContainerItem {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "container_id", referencedColumnName = "id", nullable = false)
    @JsonView(Views.ItemContainer.class)
    private Container container;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("itemAttributes")
    @JsonView(Views.ContainerItem.class)
    private Item item;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    public ContainerItem(ContainerItem other) {
        this.id = null;
        this.container = other.container;
        this.item = other.item;
        this.quantity = other.quantity;
    }
}
