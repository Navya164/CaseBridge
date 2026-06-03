package com.casebridge.backend.repository;

import com.casebridge.backend.entity.ComplaintAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintAssignmentRepository
        extends JpaRepository<ComplaintAssignment, Long> {

    List<ComplaintAssignment> findByOfficerId(Long officerId);
}