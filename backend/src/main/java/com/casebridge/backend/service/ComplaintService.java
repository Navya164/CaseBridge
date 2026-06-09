package com.casebridge.backend.service;

import com.casebridge.backend.entity.Complaint;
import com.casebridge.backend.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    // CREATE COMPLAINT
    public Complaint createComplaint(Complaint complaint) {

        String code = "CB-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        complaint.setComplaintCode(code);

        return complaintRepository.save(complaint);
    }

    // GET ALL
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // UPDATE STATUS
    public Complaint updateStatus(Long id, String status) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow();

        complaint.setStatus(status);

        return complaintRepository.save(complaint);
    }

    // SEARCH
    public List<Complaint> searchByTitle(String keyword) {
        return complaintRepository.findByTitleContaining(keyword);
    }

    public Complaint trackByCode(String code) {
    return complaintRepository.findByComplaintCode(code);
}
}