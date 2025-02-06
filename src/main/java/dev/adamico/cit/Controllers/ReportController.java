package dev.adamico.cit.Controllers;

import dev.adamico.cit.Reports.BaseReport;
import dev.adamico.cit.Services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @Autowired
    private TemplateEngine templateEngine;

    // List of predefined item names
    List<String> itemNames = List.of(
            "Laptop", "Phone", "Tablet", "Monitor", "Headphones", "Keyboard", "Mouse", "Camera", "Smartwatch",
            "Printer", "Scanner", "Desk", "Chair", "TV", "Projector", "Speaker", "Microphone", "Router", "External Hard Drive",
            "Flash Drive", "USB Cable", "Docking Station", "Graphics Card", "Motherboard", "RAM", "Power Supply",
            "Gaming Console", "Smart TV", "Surveillance Camera", "Digital Frame", "Fitness Tracker", "E-reader",
            "VR Headset", "Webcam", "Digital Thermometer", "Electric Kettle", "Blender", "Smart Bulb", "Coffee Maker"
    );

    // List of predefined scanner IDs
    List<String> scannerIds = List.of(
            "ScannerA", "ScannerB", "ScannerC", "ScannerD", "ScannerE", "ScannerF", "ScannerG", "ScannerH", "ScannerI",
            "ScannerJ", "ScannerK", "ScannerL", "ScannerM", "ScannerN", "ScannerO", "ScannerP", "ScannerQ", "ScannerR",
            "ScannerS", "ScannerT", "ScannerU", "ScannerV", "ScannerW", "ScannerX", "ScannerY", "ScannerZ", "ScannerAA",
            "ScannerAB", "ScannerAC", "ScannerAD", "ScannerAE", "ScannerAF", "ScannerAG", "ScannerAH", "ScannerAI",
            "ScannerAJ", "ScannerAK", "ScannerAL", "ScannerAM", "ScannerAN", "ScannerAO", "ScannerAP", "ScannerAQ",
            "ScannerAR", "ScannerAS", "ScannerAT", "ScannerAU", "ScannerAV", "ScannerAW", "ScannerAX", "ScannerAY",
            "ScannerAZ"
    );

    @GetMapping
    public String htmlPage(Model model) throws IOException {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy HH:mm");
        String formattedDateTime = now.format(formatter);

        List<BaseReport> data = createData();

        model.addAttribute("data", data);
        model.addAttribute("createdAt", formattedDateTime);
        model.addAttribute("containerName", "Container 1");

        return renderTemplate("base_report.html", model);
    }

    private List<BaseReport> createData() {
        List<BaseReport> reportList = new ArrayList<>();
        Random random = new Random();

        for(int i = 0; i < 200; i++){
            reportList.add(new BaseReport(itemNames.get(random.nextInt(itemNames.size())), scannerIds.get(random.nextInt(scannerIds.size()))));
        }

        reportList.sort((a,b) -> a.getItemName().compareToIgnoreCase(b.getItemName()));

        return reportList;
    }

    @GetMapping("/base")
    public ResponseEntity<byte[]> temp(Model model, Long containerId) throws IOException {
//        List<BaseReport> data = reportService.createBaseReport();

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy HH:mm");
        String formattedDateTime = now.format(formatter);

        List<BaseReport> data = createData();

        model.addAttribute("data", data);
        model.addAttribute("createdAt", formattedDateTime);
        model.addAttribute("containerName", "Container 1");

        try {
            InputStream scriptStream = getClass().getClassLoader().getResourceAsStream("scripts/generate-pdf.js");

            if(scriptStream == null) {
                throw new FileNotFoundException("Script file was not found.");
            }

            String scriptContent = new String(scriptStream.readAllBytes(), StandardCharsets.UTF_8);

            Path tempScriptFile = Files.createTempFile("generate-pdf", ".js");
            Files.writeString(tempScriptFile, scriptContent);

            String content = renderTemplate("base_report.html", model);
            Path tempFile = Files.createTempFile("base_report", ".html");
            Files.writeString(tempFile, content);

            String projectDir;

            if(System.getenv("APP_ENV") == null) {
                projectDir = new File(System.getProperty("user.dir")).getAbsolutePath();
            } else {
                projectDir = "/app";
            }

            ProcessBuilder processBuilder = new ProcessBuilder("node", tempScriptFile.toString(), tempFile.toString());
            processBuilder.directory(new File(projectDir));
            processBuilder.redirectErrorStream(true);
            processBuilder.environment().put("NODE_PATH", new File(projectDir, "node_modules").getAbsolutePath());

            Process process = processBuilder.start();

            // Capture output and errors
            InputStreamReader inputStreamReader = new InputStreamReader(process.getInputStream());
            BufferedReader reader = new BufferedReader(inputStreamReader);
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);  // Print the output from Node.js
            }

            int exitCode = process.waitFor();
            if(exitCode != 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error generating PDF".getBytes());
            }

            byte[] pdfBytes = Files.readAllBytes(Paths.get("output.pdf"));

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=output.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating PDF".getBytes());
        }
    }

    private String renderTemplate(String templateName, Model model) {
        Context context = new Context();

        context.setVariables(model.asMap());

        return templateEngine.process(templateName, context);
    }
}
