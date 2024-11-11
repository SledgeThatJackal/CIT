package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.*;
import dev.adamico.cit.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
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
    @ManyToOne(targetEntity = Container.class, fetch = FetchType.EAGER)
    @JsonView(Views.ExclusiveObject.class)
    private Container parentContainer;

    @OneToMany(mappedBy = "parentContainer", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Container> childContainers = new HashSet<>();

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonView(Views.Inclusive.class)
    @JsonIgnoreProperties("container")
    private Set<ContainerItem> containerItems;

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
