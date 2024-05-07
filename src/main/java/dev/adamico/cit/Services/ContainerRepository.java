package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Container;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContainerRepository extends JpaRepository<Container, Long> {
    Optional<Container> findByName(String name);
    Optional<Container> findByScannerId(String scannerId);
}
