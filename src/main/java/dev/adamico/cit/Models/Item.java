package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    @Fetch(FetchMode.SUBSELECT)
    private Set<ContainerItem> containerItems;

    @ManyToMany
    @JoinTable(
            name = "itemtag_table",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @JsonView(Views.Exclusive.class)
    @Fetch(FetchMode.SUBSELECT)
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
    @Fetch(FetchMode.SUBSELECT)
    private Set<Image> images;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("item")
    @Fetch(FetchMode.SUBSELECT)
    private List<ItemAttribute> itemAttributes;

    @Transient
    private Integer totalQuantity = 0;

    private String externalUrl;


    public void sortItemAttributes(){
        if(itemAttributes != null && !itemAttributes.isEmpty()){
            itemAttributes.sort(Comparator.comparing(a -> a.getTypeAttribute().getDisplayOrder()));
        }
    }

    public void setTotalQuantity(){
        this.totalQuantity = containerItems.stream().mapToInt(ContainerItem::getQuantity).sum();
    }

    public Item(Item other){
        this.id = null;
        this.name = other.name;
        this.description = other.description;

        this.containerItems = other.getContainerItems().stream().map(containerItem -> {
            ContainerItem newCI = new ContainerItem(containerItem);
            newCI.setItem(this);
            return newCI;
        }).collect(Collectors.toUnmodifiableSet());

        this.tags = other.tags;
        this.itemType = other.itemType;
        this.images = other.images;
        this.itemAttributes = other.itemAttributes;
        this.totalQuantity = other.totalQuantity;
        this.externalUrl = other.externalUrl;
    }

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