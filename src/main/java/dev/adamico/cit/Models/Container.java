package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "container_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Basic.class)
public class Container {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String description;
    private String scannerId;

    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    @ManyToOne(targetEntity = Container.class, fetch = FetchType.EAGER)
    @JsonView(Views.ContainerItem.class)
    private Container parentContainer;

    @OneToMany(mappedBy = "parentContainer", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Container> childContainers = new HashSet<>();

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = {"container"}, allowSetters = true)
    @JsonView(Views.ContainerItem.class)
    private Set<ContainerItem> containerItems;

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SUBSELECT)
    @OrderBy("imageOrder")
    @JsonIgnoreProperties("container")
    @JsonView(Views.ContainerItem.class)
    private List<ContainerImage> images;

    @JsonView(Views.ContainerItem.class)
    @JsonProperty("isArea")
    private boolean isArea;

    @Transactional
    public void addParent(Container parent){
        this.parentContainer = parent;
        parent.addChild(this);
    }

    @Transactional
    public void addChild(Container child){
        this.childContainers.add(child);
    }

    @JsonIgnore
    public Set<Container> getDescendants(){
        Set<Container> descendants = new HashSet<>();
        addDescendantsToSet(descendants);

        return descendants;
    }

    @JsonIgnore
    @Transactional
    private void addDescendantsToSet(Set<Container> descendants){
        for(Container child: this.getChildContainers()){
            descendants.add(child);
            child.addDescendantsToSet(descendants);
        }
    }

    @JsonIgnore
    @Transactional
    public void removeChildren(){
        for(Container child : this.getChildContainers()){
            child.setParentContainer(null);
        }
    }
}
