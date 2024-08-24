package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import dev.adamico.cit.Models.Item;
import jakarta.annotation.Nonnull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ContainerItemRepository extends JpaRepository<ContainerItem, Long> {
    @Query("Select containerItem.container FROM ContainerItem containerItem WHERE containerItem.item.id = :itemId")
    Set<Container> findContainersByItemId(@Param("itemId") Long itemId);

    Set<ContainerItem> findByItemId(Long itemId);

    void deleteById(@Nonnull Long itemContainerId);

    @Modifying
    @Query("UPDATE ContainerItem ci SET ci.quantity = :quantity WHERE ci.id = :id")
    void updateQuantityById(@Param("quantity") Integer quantity,
                           @Param("id") Long id);

    @Query("SELECT i FROM Item i " +
            "WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(i.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    Page<Item> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            @Param("name") String name,
            @Param("description") String description,
            Pageable pageable);
}