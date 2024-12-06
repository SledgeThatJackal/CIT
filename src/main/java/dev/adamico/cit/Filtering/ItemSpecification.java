package dev.adamico.cit.Filtering;

import dev.adamico.cit.DTO.ItemQueryRequest;
import dev.adamico.cit.Models.Item;
import dev.adamico.cit.Models.ItemAttribute;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ItemSpecification{

    public static Specification<Item> withFilters(String type, List<ItemQueryRequest.FilterColumn> filterColumns) {
        return ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(!type.isEmpty()){
                predicates.add(criteriaBuilder.equal(root.join("itemType").get("name"), type));
            }

            for(ItemQueryRequest.FilterColumn filterColumn: filterColumns) {
                String key = filterColumn.getColumnLabel();
                String value = filterColumn.getValue();

                switch (key) {
                    case "name", "description" -> predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(key)), "%" + value.toLowerCase() + "%"));

                    case "tags" -> predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.join("tags").get("tag")), "%" + value.toLowerCase() + "%"));

                    case "itemType" -> predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.join("itemType").get("name")), "%" + value.toLowerCase() + "%"));

                    default -> {
                        String comparison = filterColumn.getComparison();
                        Integer id = filterColumn.getId();

                        Join<Item, ItemAttribute> itemAttributeJoin = root.join("itemAttributes");
                        predicates.add(
                                criteriaBuilder.and(
                                criteriaBuilder.equal(itemAttributeJoin.join("typeAttribute").get("id"), id),
                                comparison.equalsIgnoreCase("E") ? applyStringFilter(criteriaBuilder, value, itemAttributeJoin) : applyNumberFilter(criteriaBuilder, value, comparison, itemAttributeJoin)));
                    }
                };
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    private static Predicate applyNumberFilter(CriteriaBuilder criteriaBuilder, String value, String comparison, Join<Item, ItemAttribute> itemAttributeJoin){
        Path<Double> doublePath = itemAttributeJoin.get("numberValue");
        Predicate nonNullPredicate = criteriaBuilder.isNotNull(doublePath);

        Double doubleValue = 0.0;

        if(!value.contains(",")){
            doubleValue = Double.parseDouble(value);
        }

        Predicate comparisonPredicate = switch(comparison){
            case "GT" -> criteriaBuilder.gt(doublePath, doubleValue);

            case "GTE" -> criteriaBuilder.greaterThanOrEqualTo(doublePath, doubleValue);

            case "LT" -> criteriaBuilder.lt(doublePath, doubleValue);

            case "LTE" -> criteriaBuilder.lessThanOrEqualTo(doublePath, doubleValue);

            case "R" -> {
                String[] part = value.split(",");
                Double val1 = Double.parseDouble(part[0]);
                Double val2 = Double.parseDouble(part[1]);

                yield criteriaBuilder.between(doublePath, val1, val2);
            }

            default -> criteriaBuilder.equal(doublePath, doubleValue);
        };

        return criteriaBuilder.and(nonNullPredicate, comparisonPredicate);
    }

    private static Predicate applyStringFilter(CriteriaBuilder criteriaBuilder, String value, Join<Item, ItemAttribute> itemAttributeJoin){
        return criteriaBuilder.like(criteriaBuilder.lower(itemAttributeJoin.get("stringValue")), "%" + value.toLowerCase() + "%");
    }
}
