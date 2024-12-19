package dev.adamico.cit.mock;

import dev.adamico.cit.Models.Item;

import java.util.List;

public class ItemEntityMocks {
    public static Item getItem(){
        return new Item(1L, "Test Item", "", null, null, null, null, null, 0, null);
    }

    public static List<Item> getItems(){
        return null;
    }
}
