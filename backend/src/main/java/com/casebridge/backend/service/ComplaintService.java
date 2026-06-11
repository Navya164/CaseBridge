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

        String code = "CB-" + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

        complaint.setComplaintCode(code);

        return complaintRepository.save(complaint);
    }

    // GET ALL
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // UPDATE STATUS + REVIEW ACTION + OFFICER NOTE
    public Complaint updateStatus(Long id, String status, String reviewAction, String officerNote) {

    Complaint complaint = complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    complaint.setStatus(status);

    // IMPORTANT: force save values properly
    complaint.setReviewAction(reviewAction);
    complaint.setOfficerNote(officerNote);

    return complaintRepository.save(complaint);
}

    // SEARCH BY TITLE
    public List<Complaint> searchByTitle(String keyword) {
        return complaintRepository.findByTitleContaining(keyword);
    }

    // TRACK BY CODE
    public Complaint trackByCode(String code) {
        return complaintRepository.findByComplaintCode(code);
    }

    // OPTIONAL: UPDATE FULL COMPLAINT
    public Complaint updateComplaint(Long id, Complaint request) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());
        complaint.setStatus(request.getStatus());

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getComplaintsByUser(Long userId) {
    return complaintRepository.findByUserId(userId);
}
}