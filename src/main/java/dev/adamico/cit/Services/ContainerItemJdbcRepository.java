package dev.adamico.cit.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class ContainerItemJdbcRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public Integer getTotalQuantityByItemId(Long itemId){
        String jpql = "SELECT SUM(item.quantity) FROM Item item WHERE item.id = :itemId";
        Integer totalQuantity = entityManager.createQuery(jpql, Integer.class)
                .setParameter("itemId", itemId)
                .getSingleResult();

        return totalQuantity != null ? totalQuantity : 0;
    }
}
