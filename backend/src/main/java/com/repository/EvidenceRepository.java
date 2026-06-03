package com.casebridge.backend.repository;

import com.casebridge.backend.entity.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EvidenceRepository
        extends JpaRepository<Evidence, Long> {

    List<Evidence> findByComplaintId(Long complaintId);

    
}