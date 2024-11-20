package dev.adamico.cit.Filtering;

import dev.adamico.cit.Models.Item;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.Map;

public class ItemSpecification{

    public static Specification<Item> withFilters(Map<String, String> filters) {
        return ((root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            for(Map.Entry<String, String> filter: filters.entrySet()) {
                String key = filter.getKey();
                String value = filter.getValue();

                if("name".equals(key) || "description".equals(key)){
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.like(criteriaBuilder.lower(root.get(key)), "%" + value.toLowerCase() + "%"));
                } else if("tags".equals(key)){
                    predicate = criteriaBuilder.and(predicate,
                                criteriaBuilder.like(criteriaBuilder.lower(root.join("tags").get("tag")), "%" + value.toLowerCase() + "%"));
                } else if("itemType".equals(key)){
                    predicate = criteriaBuilder.and(predicate,
                                criteriaBuilder.like(criteriaBuilder.lower(root.join("itemType").get("name")), "%" + value.toLowerCase() + "%"));
                } else {
                    predicate = criteriaBuilder.and(predicate,
                                criteriaBuilder.like(criteriaBuilder.lower(root.join("itemattributes", JoinType.INNER).get("value")), "%" + value.toLowerCase() + "%"),
                                criteriaBuilder.like(root.join("itemattributes", JoinType.INNER).join("typeattributes", JoinType.INNER).get("column_title"), "%" + value + "%"));
                }
            }

            return predicate;
        });
    }
}
