package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "container_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference("containerReference")
    private Container container;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference("itemReference")
    private Item item;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}
