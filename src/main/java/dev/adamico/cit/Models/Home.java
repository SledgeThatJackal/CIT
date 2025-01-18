package dev.adamico.cit.Models;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Views;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;

import java.util.List;

@NoArgsConstructor
@Data
@JsonView(Views.Basic.class)
public class Home {
    private Long numberOfContainers;
    private Long numberOfItems;

    private List<Pair<ItemType, Long>> itemTypes;

    public Home(Long numberOfContainers, Long numberOfItems, List<Object[]> itemTypes) {
        this.numberOfContainers = numberOfContainers;
        this.numberOfItems = numberOfItems;
        this.itemTypes = itemTypes.stream().map(result -> new Pair<>((ItemType) result[0], (Long) result[1])).toList();
    }
}
