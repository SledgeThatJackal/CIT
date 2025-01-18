package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    @Query("SELECT i.itemType, COUNT(i) FROM Item i GROUP BY i.itemType")
    List<Object[]> findItemTypesAndCounts();
}
