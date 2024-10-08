package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "tags_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Exclusive.class)
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String tag;

    private String color;
    private String description;

    @ManyToMany(mappedBy = "tags", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Item> item;
}
