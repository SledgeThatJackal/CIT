package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "container_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Container {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String description;
    private String scannerId;

    private Long parentContainer;

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("containerReference")
    private Set<ContainerItem> containerItems;
}
