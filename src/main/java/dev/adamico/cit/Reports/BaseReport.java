package dev.adamico.cit.Reports;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BaseReport {
    private String itemName;
    private String scannerId;

    @Override
    public String toString() {
        return "BaseReport{" +
                "itemName='" + itemName + '\'' +
                ", scannerId='" + scannerId + '\'' +
                '}';
    }
}
