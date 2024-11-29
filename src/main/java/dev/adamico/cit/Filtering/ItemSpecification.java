package dev.adamico.cit.Filtering;

import dev.adamico.cit.Models.Item;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.Map;

public class ItemSpecification{

    public static Specification<Item> withFilters(Map<String, String> filters) {
        return ((root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            for(Map.Entry<String, String> filter: filters.entrySet()) {
                String key = filter.getKey();
                String value = filter.getValue();

                if ("name".equals(key) || "description".equals(key)) {
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.like(criteriaBuilder.lower(root.get(key)), "%" + value.toLowerCase() + "%"));
                } else if ("tags".equals(key)) {
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.like(criteriaBuilder.lower(root.join("tags").get("tag")), "%" + value.toLowerCase() + "%"));
                } else if ("itemType".equals(key)) {
                    predicate = criteriaBuilder.and(predicate,
                            criteriaBuilder.like(criteriaBuilder.lower(root.join("itemType").get("name")), "%" + value.toLowerCase() + "%"));
                } else if ("type".equals(key)) {
                    predicate = criteriaBuilder.and(predicate,
                                criteriaBuilder.equal(root.join("itemType").get("name"), value));
                } else {
                    predicate = criteriaBuilder.and(predicate,
                                criteriaBuilder.like(criteriaBuilder.lower(root.join("itemAttributes").get("value")), "%" + value.toLowerCase() + "%"),
                                criteriaBuilder.equal(root.join("itemAttributes").join("typeAttribute").get("id"), Integer.parseInt(key.replaceAll(".*?(\\d+)$", "$1"))));
                }
            }

            return predicate;
        });
    }

    private static Predicate applyNumberFilter(Root<?> root, Predicate predicate, CriteriaBuilder criteriaBuilder, String key, String value){
        switch(value){
            case "G" -> {
                return criteriaBuilder.and(predicate, criteriaBuilder.like(criteriaBuilder.equal(root.join("itemAttributes").get("numberValue"), Integer.parseInt(key.replaceAll(".*?(\\d+)$", "$1"))),
                        criteriaBuilder.equal(root.join("itemAttributes").join("typeAttribute").get("id"), Integer.parseInt(key.replaceAll(".*?(\\d+)$", "$1"))))));
            }
            case "GE" -> {

            }
            case "L" -> {

            }
            case "LE" -> {

            }
            case "R" -> {

            }
            default -> {

            }
        }

        return predicate;
    }

    private static Predicate applyStringFilter(Root<?> root, Predicate predicate, CriteriaBuilder criteriaBuilder, String key, String value){
        return criteriaBuilder.and(predicate,
                criteriaBuilder.like(criteriaBuilder.lower(root.join("itemAttributes").get("stringValue")), "%" + value.toLowerCase() + "%"),
                criteriaBuilder.equal(root.join("itemAttributes").join("typeAttribute").get("id"), Integer.parseInt(key.replaceAll(".*?(\\d+)$", "$1"))));
    }
}
