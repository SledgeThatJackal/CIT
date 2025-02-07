package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.ItemTag;
import dev.adamico.cit.Models.Keys.ItemTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTagRepository extends JpaRepository<ItemTag, ItemTagId> {
}
