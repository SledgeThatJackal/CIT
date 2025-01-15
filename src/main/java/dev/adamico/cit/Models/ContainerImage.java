package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "containerimages_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonView(Views.Basic.class)
public class ContainerImage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "container_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("images")
    private Container container;

    @ManyToOne
    @JoinColumn(name = "image_id", referencedColumnName = "id", nullable = false)
    private Image image;

    @Column(name = "image_order", nullable = false)
    private Integer imageOrder;
}
