package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "settings_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonView(Views.Exclusive.class)
public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String key;
    private String value;
}
