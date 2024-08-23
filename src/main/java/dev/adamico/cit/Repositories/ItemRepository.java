package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description, Pageable pageable);

    @Query("SELECT i FROM Item i LEFT JOIN FETCH i.containerItems ci LEFT JOIN FETCH ci.container")
    List<Item> findAllItemsWithContainersAndQuantities();
}
