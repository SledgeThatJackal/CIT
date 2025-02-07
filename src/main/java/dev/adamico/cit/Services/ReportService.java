package dev.adamico.cit.Services;

import dev.adamico.cit.Reports.ContainerContents;
import dev.adamico.cit.Repositories.ContainerRepository;
import dev.adamico.cit.Repositories.ItemRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    ContainerRepository containerRepository;

    @Autowired
    private TemplateEngine templateEngine;

    @Transactional
    public ResponseEntity<byte[]> generateContainerContentsReport(Model model, Long containerId) throws IOException {
        List<ContainerContents> data = containerRepository
                                    .getBaseReportData(containerId)
                                    .stream()
                                    .map(row -> new ContainerContents((String) row[0], (String) row[1]))
                                    .toList();

        Tuple containerInfo = containerRepository.findNameById(containerId);

        String containerName = containerInfo.get(0, String.class);
        String reportTitle;

        if(containerName.equalsIgnoreCase(containerInfo.get(1, String.class))){
            reportTitle = containerName;
        } else {
            reportTitle = String.format("%s (%s)", containerName, containerInfo.get(1, String.class));
        }

        model.addAttribute("data", data);
        model.addAttribute("containerName", reportTitle);

        Path tempHTMLPath = createTempHTMLFilePath(model, "container_contents");

        return generatePDF(tempHTMLPath, String.format("%s_report.pdf", changeToProperCase(containerName)));
    }

    private ResponseEntity<byte[]> generatePDF(Path tempHTMLPath, String fileName) {
        try {
            InputStream scriptStream = getClass().getClassLoader().getResourceAsStream("scripts/generate-pdf.js");

            if(scriptStream == null) {
                throw new FileNotFoundException("Script file was not found.");
            }

            String scriptContent = new String(scriptStream.readAllBytes(), StandardCharsets.UTF_8);

            Path tempScriptFile = Files.createTempFile("generate-pdf", ".js");
            Files.writeString(tempScriptFile, scriptContent);

            String projectDir;

            if(System.getenv("APP_ENV") == null) {
                projectDir = new File(System.getProperty("user.dir")).getAbsolutePath();
            } else {
                projectDir = "/app";
            }

            ProcessBuilder processBuilder = new ProcessBuilder("node", tempScriptFile.toString(), tempHTMLPath.toString(), fileName);
            processBuilder.directory(new File(projectDir));
            processBuilder.redirectErrorStream(true);
            processBuilder.environment().put("NODE_PATH", new File(projectDir, "node_modules").getAbsolutePath());

            Process process = processBuilder.start();

            scriptOutput(process);

            int exitCode = process.waitFor();
            if(exitCode != 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error generating PDF".getBytes());
            }

            Path path = Paths.get(fileName);
            byte[] pdfBytes = Files.readAllBytes(path);
            Files.delete(path);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=%s", fileName))
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating PDF".getBytes());
        }
    }

    private Path createTempHTMLFilePath(Model model, String report) throws IOException {
        String content = renderTemplate(String.format("%s.html", report), model);
        Path tempFile = Files.createTempFile(report, ".html");
        Files.writeString(tempFile, content);

        return tempFile;
    }

    private String renderTemplate(String templateName, Model model) {
        Context context = new Context();

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy HH:mm");
        String formattedDateTime = now.format(formatter);

        model.addAttribute("createdAt", formattedDateTime);

        context.setVariables(model.asMap());

        return templateEngine.process(templateName, context);
    }

    private String changeToProperCase(String name) {
        String[] words = name
                            .replaceAll("[\\\\/:*?\"<>|]", "_")
                            .split("\\s+");

        StringBuilder builder = new StringBuilder();

        for(String word: words) {
            builder.append(word.substring(0, 1).toUpperCase())
                   .append(word.substring(1));
        }

        return builder.toString();
    }

    private void scriptOutput(Process process) throws IOException {
        // Capture output and errors
        InputStreamReader inputStreamReader = new InputStreamReader(process.getInputStream());
        BufferedReader reader = new BufferedReader(inputStreamReader);
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line); // Print the output from Node.js
        }
    }
}
