package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.TypeAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeAttributeRepository extends JpaRepository<TypeAttribute, Long> {
}
