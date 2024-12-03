package dev.adamico.cit.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemQueryRequest {
    private int page;
    private int size;
    private String type;

    private List<FilterColumn> filterColumns;
    private List<SortColumn> sortColumns;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FilterColumn{
        private String columnLabel;
        private String comparison;
        private String value;
        private String id;

        public Integer getId(){
            return Integer.parseInt(id);
        }

        @Override
        public String toString() {
            return "FilterColumn{" +
                    "columnLabel='" + columnLabel + '\'' +
                    ", comparison='" + comparison + '\'' +
                    ", value='" + value + '\'' +
                    ", id=" + id +
                    '}';
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SortColumn {
        private String columnLabel;
        private String direction;

        public Sort.Direction getDirection(){
            return direction.equalsIgnoreCase("false") ? Sort.Direction.ASC : Sort.Direction.DESC;
        }

        @Override
        public String toString() {
            return "SortColumn{" +
                    "columnLabel='" + columnLabel + '\'' +
                    ", direction=" + direction +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "ItemQueryRequest{" +
                "page=" + page +
                ", size=" + size +
                ", type='" + type + '\'' +
                ", filterColumns=" + filterColumns +
                ", sortColumns=" + sortColumns +
                '}';
    }
}
