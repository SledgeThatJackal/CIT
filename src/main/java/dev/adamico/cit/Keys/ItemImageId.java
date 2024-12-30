package dev.adamico.cit.Keys;

import java.io.Serializable;
import java.util.Objects;

public class ItemImageId implements Serializable {
    private Long itemId;
    private Long imageId;

    public ItemImageId() {
    }

    public ItemImageId(Long itemId, Long imageId) {
        this.itemId = itemId;
        this.imageId = imageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemImageId that = (ItemImageId) o;
        return Objects.equals(itemId, that.itemId) && Objects.equals(imageId, that.imageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, imageId);
    }
}
