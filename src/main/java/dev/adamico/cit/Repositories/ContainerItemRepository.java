package dev.adamico.cit.Repositories;

import dev.adamico.cit.DTOs.LinkDTO;
import dev.adamico.cit.Models.ContainerItem;
import jakarta.annotation.Nonnull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ContainerItemRepository extends JpaRepository<ContainerItem, Long> {
    @Query("SELECT new dev.adamico.cit.DTOs.LinkDTO(ci.id, ci.quantity, c.name, c.scannerId) FROM ContainerItem ci JOIN ci.container c WHERE ci.item.id =:itemId")
    List<LinkDTO> findContainersByItemId(@Param("itemId") Long itemId);

    Set<ContainerItem> findByItemId(Long itemId);

    void deleteById(@Nonnull Long itemContainerId);

    @Modifying
    @Query("UPDATE ContainerItem ci SET ci.quantity = :quantity WHERE ci.id = :id")
    void updateQuantityById(@Param("quantity") Integer quantity,
                            @Param("id") Long id);
}