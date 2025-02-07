package dev.adamico.cit.Controllers;

import dev.adamico.cit.Services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/base/{containerId}")
    public ResponseEntity<byte[]> createContainerContentsReport(Model model, @PathVariable("containerId") Long containerId) throws IOException {
        return reportService.generateContainerContentsReport(model, containerId);
    }
}
