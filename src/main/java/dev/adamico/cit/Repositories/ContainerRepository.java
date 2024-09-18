package dev.adamico.cit.Repositories;

import dev.adamico.cit.DTOs.ContainerDTO;
import dev.adamico.cit.Models.Container;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ContainerRepository extends JpaRepository<Container, Long> {
    Optional<Container> findByName(String name);
    Optional<Container> findByScannerId(String scannerId);

    @Query("SELECT new dev.adamico.cit.DTOs.ContainerDTO(c.name, c.scannerId) FROM Container c ORDER BY id ASC")
    List<ContainerDTO> findAllScannerIdsAndNames();
}
