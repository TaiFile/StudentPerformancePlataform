package com.demo.domain.entity;

import com.demo.domain.enums.Branch;
import com.demo.domain.enums.CollegeTier;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_placement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentPlacement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "branch", nullable = false, length = 20)
    private Branch branch;

    @Enumerated(EnumType.STRING)
    @Column(name = "college_tier", nullable = false, length = 10)
    private CollegeTier collegeTier;

    @Column(name = "cgpa", nullable = false)
    private Double cgpa;

    @Column(name = "backlogs", nullable = false)
    private Integer backlogs;

    @Column(name = "coding_skills", nullable = false)
    private Double codingSkills;

    @Column(name = "dsa_score", nullable = false)
    private Double dsaScore;

    @Column(name = "aptitude_score", nullable = false)
    private Double aptitudeScore;

    @Column(name = "communication_skills", nullable = false)
    private Double communicationSkills;

    @Column(name = "ml_knowledge", nullable = false)
    private Double mlKnowledge;

    @Column(name = "system_design", nullable = false)
    private Double systemDesign;

    @Column(name = "internships", nullable = false)
    private Integer internships;

    @Column(name = "projects_count", nullable = false)
    private Integer projectsCount;

    @Column(name = "certifications", nullable = false)
    private Integer certifications;

    @Column(name = "hackathons", nullable = false)
    private Integer hackathons;

    @Column(name = "open_source_contributions", nullable = false)
    private Integer openSourceContributions;

    @Column(name = "extracurriculars", nullable = false)
    private Integer extracurriculars;

    @Column(name = "placement_status", nullable = false)
    private Integer placementStatus;

    @Column(name = "salary_package_lpa")
    private Double salaryPackageLpa;
}
