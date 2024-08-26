package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @EntityGraph(value="graph.Item", type = EntityGraph.EntityGraphType.FETCH)
    List<Item> findByIdIn(Set<Long> ids);

    @Query("SELECT i.id FROM Item i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    Page<Long> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(@Param("name") String name, @Param("description") String description, Pageable pageable);

}
