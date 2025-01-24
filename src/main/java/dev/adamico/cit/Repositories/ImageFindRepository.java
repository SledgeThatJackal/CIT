package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Views.ImageFind;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

interface ImageFindInterface {
    List<ImageFind> findByContainerOrItemName(@Param("containerName") String containerName,
                                              @Param("scannerId") String scannerId,
                                              @Param("itemName") String itemName);
}

@Repository
public class ImageFindRepository implements ImageFindInterface {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @SuppressWarnings("unchecked")
    public List<ImageFind> findByContainerOrItemName(String containerName, String scannerId, String itemName) {
        StringBuilder queryBuilder = getStringBuilder(containerName, scannerId, itemName);

        Query query = entityManager.createNativeQuery(queryBuilder.toString(), ImageFind.class);

        if(containerName != null)
            query.setParameter("containerName", "%" + containerName + "%");

        if(scannerId != null)
            query.setParameter("scannerId", "%" + scannerId + "%");

        if(itemName != null)
            query.setParameter("itemName", "%" + itemName + "%");

        return query.getResultList();
    }

    private StringBuilder getStringBuilder(String containerName, String scannerId, String itemName) {
        StringBuilder queryBuilder = new StringBuilder("SELECT img.scanner_id, img.item_id, img.file_name FROM image_find img WHERE 1=1 ");

        if(containerName != null)
            queryBuilder.append("AND img.scanner_id IN (SELECT c.scanner_id FROM container_table c WHERE c.name LIKE :containerName) ");

        if(scannerId != null)
            queryBuilder.append("AND img.scanner_id LIKE :scannerId ");

        if(itemName != null)
            queryBuilder.append("AND img.item_id IN (SELECT i.id FROM item_table i WHERE i.name LIKE :itemName) ");

        return queryBuilder;
    }

    public Integer count(){
        return (Integer) entityManager.createNativeQuery("SELECT COUNT(*) FROM image_find", Integer.class).getSingleResult();
    }
}
