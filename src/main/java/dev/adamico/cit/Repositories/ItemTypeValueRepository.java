package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.ItemTypeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTypeValueRepository extends JpaRepository<ItemTypeValue, Long> {
}
