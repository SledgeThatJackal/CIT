package dev.adamico.cit.Services;

import dev.adamico.cit.Models.ContainerItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContainerItemRepository extends JpaRepository<ContainerItem, Long> {
}
