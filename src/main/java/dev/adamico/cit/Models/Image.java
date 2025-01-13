package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "images_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Basic.class)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String fileName;
}
