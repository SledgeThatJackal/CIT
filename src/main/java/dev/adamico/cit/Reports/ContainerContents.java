package dev.adamico.cit.Reports;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContainerContents {
    private String itemName;
    private String scannerId;

    @Override
    public String toString() {
        return "ContainerContents{" +
                "itemName='" + itemName + '\'' +
                ", scannerId='" + scannerId + '\'' +
                '}';
    }
}
