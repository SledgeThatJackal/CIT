package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.ItemAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemAttributeRepository extends JpaRepository<ItemAttribute, Long> {
}