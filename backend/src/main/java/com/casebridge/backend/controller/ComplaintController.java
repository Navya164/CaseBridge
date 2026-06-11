package com.casebridge.backend.controller;

import com.casebridge.backend.entity.Complaint;
import com.casebridge.backend.entity.ComplaintHistory;
import com.casebridge.backend.repository.ComplaintHistoryRepository;
import com.casebridge.backend.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private ComplaintHistoryRepository historyRepository;

    // CREATE COMPLAINT
    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {

        System.out.println("USER ID RECEIVED = " + complaint.getUserId());

        complaint.setCreatedAt(LocalDateTime.now());

        return complaintService.createComplaint(complaint);
    }

    // GET ALL COMPLAINTS
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    // GET COMPLAINT HISTORY (AUDIT TRAIL)
    @GetMapping("/{id}/history")
    public List<ComplaintHistory> getComplaintHistory(
            @PathVariable Long id) {

        return historyRepository
                .findByComplaint_IdOrderByUpdatedAtDesc(id);
    }

    // UPDATE STATUS + REVIEW ACTION + OFFICER NOTE
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Complaint request) {

        Complaint updated = complaintService.updateStatus(
                id,
                request.getStatus(),
                request.getReviewAction(),
                request.getOfficerNote()
        );

        return ResponseEntity.ok(updated);
    }

    // SEARCH BY TITLE
    @GetMapping("/search/{keyword}")
    public List<Complaint> searchComplaints(
            @PathVariable String keyword) {

        return complaintService.searchByTitle(keyword);
    }

    // TRACK BY COMPLAINT CODE
    @GetMapping("/track/{code}")
    public Complaint trackComplaint(
            @PathVariable String code) {

        return complaintService.trackByCode(code);
    }

    // GET USER COMPLAINTS
    @GetMapping("/user/{userId}")
    public List<Complaint> getUserComplaints(
            @PathVariable Long userId) {

        return complaintService.getComplaintsByUser(userId);
    }

    // UPDATE FULL COMPLAINT
    @PutMapping("/{id}/update")
    public Complaint updateComplaint(
            @PathVariable Long id,
            @RequestBody Complaint request) {

        return complaintService.updateComplaint(id, request);
    }
}