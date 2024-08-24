package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "containeritem_table")
@NoArgsConstructor
@AllArgsConstructor
public class ContainerItem {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "container_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("containerItems")
    @JsonView(Views.Inclusive.class)
    private Container container;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("containerItems")
    @JsonView(Views.Inclusive.class)
    private Item item;

    @Column(name = "quantity", nullable = false)
    @JsonView(Views.Inclusive.class)
    private Integer quantity;
}
