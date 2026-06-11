package com.casebridge.backend.repository;

import com.casebridge.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    Complaint findByComplaintCode(String complaintCode);

    List<Complaint> findByTitleContaining(String keyword);
    List<Complaint> findByUserId(Long userId);
}