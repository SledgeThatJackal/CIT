package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "item_table")
@NamedEntityGraph(
        name = "graph.Item",
        attributeNodes= {
                @NamedAttributeNode(value = "containerItems", subgraph = "containerItemSubgraph")
        },
        subgraphs = {
                @NamedSubgraph(
                        name = "containerItemSubgraph",
                        attributeNodes = {
                                @NamedAttributeNode("id"),
                                @NamedAttributeNode("quantity"),
                                @NamedAttributeNode("container")
                        }
                )
        })
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Exclusive.class)
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonView(Views.Inclusive.class)
    @JsonIgnoreProperties("item")
    private Set<ContainerItem> containerItems;

    @ManyToMany
    @JoinTable(
            name = "itemtag_table",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @JsonView(Views.Exclusive.class)
    private Set<Tag> tags;

    @ManyToOne
    @JoinColumn(name = "itemtype_id", referencedColumnName = "id")
    private ItemType itemType;

    @ManyToMany
    @JoinTable(
            name= "itemimages_table",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    @JsonView(Views.Exclusive.class)
    private Set<Image> images;

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", containerItems=" + containerItems +
                ", tags=" + tags +
                ", itemType=" + itemType +
                '}';
    }
}