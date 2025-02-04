package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Container;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ContainerRepository extends JpaRepository<Container, Long> {
    Optional<Container> findByName(String name);
    Optional<Container> findByScannerId(String scannerId);

    @Query(value = "WITH RECURSIVE descendants AS ( " +
                   "SELECT id FROM container_table WHERE id = :containerId " +
                   "UNION ALL " +
                   "SELECT c.id FROM container_table c " +
                   "INNER JOIN descendants d ON c.parent_id = d.id " +
                   ") " +
                   "SELECT * FROM container_table c " +
                   "WHERE (:isArea = false OR c.is_area = true) " +
                   "AND c.id NOT IN (SELECT id FROM descendants)"
            , nativeQuery = true)
    List<Container> findAllByIsArea(boolean isArea, Long containerId);

    @Query("SELECT c FROM Container c WHERE c.parentContainer IS NULL " +
           "AND c.id != :id " +
           "AND (:isArea = false " +
           "OR c.isArea = true)"
    )
    List<Container> findAllOrphans(Long id, boolean isArea);

    @Modifying
    @Query(value = "UPDATE container_table SET parent_id = :parentId WHERE id IN (:ids)", nativeQuery = true)
    void addParent(Long parentId, List<Long> ids);
}
