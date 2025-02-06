package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Reports.BaseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    @Query("SELECT i.itemType, COUNT(i) FROM Item i GROUP BY i.itemType")
    List<Object[]> findItemTypesAndCounts();

    @Query("SELECT new dev.adamico.cit.Reports.BaseReport(i.name, c.scannerId) FROM Item i JOIN i.containerItems ci JOIN ci.container c ORDER BY i.name")
    List<BaseReport> getBaseReportData();
}
