package com.demo.domain.repository;

import com.demo.domain.entity.StudentPlacement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentPlacementRepository extends JpaRepository<StudentPlacement, Long> {
}
