package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import dev.adamico.cit.Models.ContainerItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ContainerItemRepository extends JpaRepository<ContainerItem, Long> {
    @Query("Select containerItem.container FROM ContainerItem containerItem WHERE containerItem.item.id = :itemId")
    Set<Container> findContainersByItemId(@Param("itemId") Long itemId);
}

