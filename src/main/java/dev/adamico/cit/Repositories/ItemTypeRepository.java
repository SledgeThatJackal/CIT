package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTypeRepository extends JpaRepository<ItemType, Long> {
}