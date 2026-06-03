package com.casebridge.backend.repository;

import com.casebridge.backend.entity.Complaint;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {
            List<Complaint> findByTitleContaining(String keyword);

}