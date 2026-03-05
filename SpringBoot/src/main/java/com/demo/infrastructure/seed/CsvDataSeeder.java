package com.demo.infrastructure.seed;

import com.demo.domain.entity.StudentPlacement;
import com.demo.domain.enums.Branch;
import com.demo.domain.enums.CollegeTier;
import com.demo.domain.repository.StudentPlacementRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Seed que carrega os dados do CSV para o banco de dados.
 * Executa apenas no perfil "dev" e somente se a tabela estiver vazia.
 */
@Component
@Profile("dev")
public class CsvDataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(CsvDataSeeder.class);
    private static final String CSV_FILE = "data/student_placement_synthetic.csv";
    private static final int BATCH_SIZE = 1000;

    private final StudentPlacementRepository repository;

    public CsvDataSeeder(StudentPlacementRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            log.info("✅ Dados já existem na tabela student_placement. Seed ignorado.");
            return;
        }

        log.info("🌱 Iniciando seed dos dados do CSV...");

        var resource = new ClassPathResource(CSV_FILE);
        if (!resource.exists()) {
            log.warn("⚠️ Arquivo CSV não encontrado em classpath:{}. Seed ignorado.", CSV_FILE);
            return;
        }

        List<StudentPlacement> batch = new ArrayList<>(BATCH_SIZE);
        int totalLines = 0;
        int errorCount = 0;

        try (var reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {

            // Pula o header
            String header = reader.readLine();
            if (header == null) {
                log.warn("⚠️ Arquivo CSV está vazio.");
                return;
            }

            String line;
            while ((line = reader.readLine()) != null) {
                try {
                    StudentPlacement entity = parseLine(line);
                    batch.add(entity);
                    totalLines++;

                    if (batch.size() >= BATCH_SIZE) {
                        repository.saveAll(batch);
                        batch.clear();
                        log.info("   📦 {} registros inseridos...", totalLines);
                    }
                } catch (Exception e) {
                    errorCount++;
                    if (errorCount <= 5) {
                        log.warn("⚠️ Erro na linha {}: {}", totalLines + errorCount, e.getMessage());
                    }
                }
            }

            // Salva o batch restante
            if (!batch.isEmpty()) {
                repository.saveAll(batch);
            }
        }

        log.info("✅ Seed finalizado! {} registros inseridos com sucesso. {} erros.", totalLines, errorCount);
    }

    private StudentPlacement parseLine(String line) {
        String[] fields = line.split(",", -1);

        return StudentPlacement.builder()
                .branch(Branch.fromLabel(fields[0].trim()))
                .collegeTier(CollegeTier.fromLabel(fields[1].trim()))
                .cgpa(parseDouble(fields[2]))
                .backlogs(parseInt(fields[3]))
                .codingSkills(parseDouble(fields[4]))
                .dsaScore(parseDouble(fields[5]))
                .aptitudeScore(parseDouble(fields[6]))
                .communicationSkills(parseDouble(fields[7]))
                .mlKnowledge(parseDouble(fields[8]))
                .systemDesign(parseDouble(fields[9]))
                .internships(parseInt(fields[10]))
                .projectsCount(parseInt(fields[11]))
                .certifications(parseInt(fields[12]))
                .hackathons(parseInt(fields[13]))
                .openSourceContributions(parseInt(fields[14]))
                .extracurriculars(parseInt(fields[15]))
                .placementStatus(parseInt(fields[16]))
                .salaryPackageLpa(parseNullableDouble(fields[17]))
                .build();
    }

    private double parseDouble(String value) {
        return Double.parseDouble(value.trim());
    }

    private int parseInt(String value) {
        return Integer.parseInt(value.trim());
    }

    private Double parseNullableDouble(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        return Double.parseDouble(value.trim());
    }
}
