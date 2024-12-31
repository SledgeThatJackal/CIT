package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "containerimages_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContainerImage {
    @Id
    @ManyToOne
    @JoinColumn(name = "container_id", referencedColumnName = "id")
    @JsonIgnore
    private Container container;

    @Id
    @ManyToOne
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

    private Integer imageOrder;
}
