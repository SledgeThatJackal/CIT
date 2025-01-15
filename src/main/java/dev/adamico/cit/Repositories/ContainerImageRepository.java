package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.ContainerImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContainerImageRepository extends JpaRepository<ContainerImage, Long> {
}
