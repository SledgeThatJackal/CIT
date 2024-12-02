package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.ContainerItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ContainerItemRepository extends JpaRepository<ContainerItem, Long> {
    Set<ContainerItem> findByItemId(Long itemId);

    @Modifying
    @Query("UPDATE ContainerItem ci SET ci.quantity = :quantity WHERE ci.id = :id")
    void updateQuantityById(@Param("quantity") Integer quantity,
                            @Param("id") Long id);
}