package dev.adamico.cit.mock;

import dev.adamico.cit.Models.ItemType;

public class ItemTypeEntityMocks {

    public static ItemType getItemType(){
        return new ItemType(1L, "Cable");
    }
}
