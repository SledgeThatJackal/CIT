package dev.adamico.cit.Services;

import dev.adamico.cit.Reports.BaseReport;
import dev.adamico.cit.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private ItemRepository itemRepository;

    public List<BaseReport> createBaseReport() throws IOException {
        return itemRepository.getBaseReportData();
    }
}
