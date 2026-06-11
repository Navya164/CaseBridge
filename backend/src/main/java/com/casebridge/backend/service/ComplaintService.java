package com.casebridge.backend.service;

import com.casebridge.backend.entity.Complaint;
import com.casebridge.backend.entity.ComplaintHistory;
import com.casebridge.backend.repository.ComplaintRepository;
import com.casebridge.backend.repository.ComplaintHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private ComplaintHistoryRepository historyRepository;

    // CREATE COMPLAINT
    public Complaint createComplaint(Complaint complaint) {

        String code = "CB-" + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

        complaint.setComplaintCode(code);

        return complaintRepository.save(complaint);
    }

    // GET ALL COMPLAINTS
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // UPDATE STATUS + REVIEW ACTION + OFFICER NOTE
    public Complaint updateStatus(
            Long id,
            String status,
            String reviewAction,
            String officerNote) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));

        // Update latest values
        complaint.setStatus(status);
        complaint.setReviewAction(reviewAction);
        complaint.setOfficerNote(officerNote);

        Complaint updatedComplaint =
                complaintRepository.save(complaint);

        // ==========================
        // SAVE HISTORY (AUDIT TRAIL)
        // ==========================

        ComplaintHistory history =
                new ComplaintHistory();

        history.setComplaint(updatedComplaint);
        history.setReviewAction(reviewAction);
        history.setOfficerNote(officerNote);
        history.setStatus(status);
        history.setUpdatedAt(LocalDateTime.now());

        System.out.println("SAVING HISTORY...");
System.out.println(reviewAction);
System.out.println(officerNote);
System.out.println(status);

        historyRepository.save(history);

        return updatedComplaint;
    }

    // SEARCH BY TITLE
    public List<Complaint> searchByTitle(String keyword) {
        return complaintRepository.findByTitleContaining(keyword);
    }

    // TRACK BY COMPLAINT CODE
    public Complaint trackByCode(String code) {
        return complaintRepository.findByComplaintCode(code);
    }

    // UPDATE FULL COMPLAINT
    public Complaint updateComplaint(Long id, Complaint request) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));

        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());
        complaint.setStatus(request.getStatus());

        return complaintRepository.save(complaint);
    }

    // GET COMPLAINTS OF LOGGED-IN USER
    public List<Complaint> getComplaintsByUser(Long userId) {
        return complaintRepository.findByUserId(userId);
    }
}