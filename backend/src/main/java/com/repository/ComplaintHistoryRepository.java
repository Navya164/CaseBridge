package com.casebridge.backend.repository;

import com.casebridge.backend.entity.ComplaintHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintHistoryRepository
        extends JpaRepository<ComplaintHistory, Long> {

    List<ComplaintHistory> findByComplaint_IdOrderByUpdatedAtDesc(Long complaintId);

}