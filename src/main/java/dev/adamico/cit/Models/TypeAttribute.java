package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "typeattributes_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Exclusive.class)
public class TypeAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ItemType itemType;

    private Integer displayOrder;
    private String columnTitle;
}
