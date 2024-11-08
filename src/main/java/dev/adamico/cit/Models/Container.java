package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "container_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Exclusive.class)
public class Container {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String description;
    private String scannerId;

    @JoinColumn(name = "parent_id")
    @ManyToOne(targetEntity = Container.class, fetch = FetchType.LAZY)
    @JsonView(Views.ExclusiveObject.class)
    private Container parentContainer;

    @Column(name="parent_id", insertable = false, updatable = false)
    @JsonView(Views.ExclusiveID.class)
    private Long parentContainerId;

    @OneToMany(mappedBy = "parentContainer", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Container> childContainers = new ArrayList<>();


    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonView(Views.Inclusive.class)
    @JsonIgnoreProperties("container")
    private Set<ContainerItem> containerItems;

    public void addParent(Container parent){
        this.parentContainer = parent;
        parent.addChild(this);
    }

    public void addChild(Container child){
        this.childContainers.add(child);
    }
}
