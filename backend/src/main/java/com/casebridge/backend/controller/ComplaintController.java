package com.casebridge.backend.controller;

import com.casebridge.backend.entity.Complaint;
import com.casebridge.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // CREATE COMPLAINT
    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        complaint.setCreatedAt(LocalDateTime.now());
        return complaintService.createComplaint(complaint);
    }

    // GET ALL
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public Complaint updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return complaintService.updateStatus(id, status);
    }

    // SEARCH BY TITLE
    @GetMapping("/search/{keyword}")
    public List<Complaint> searchComplaints(
            @PathVariable String keyword
    ) {
        return complaintService.searchByTitle(keyword);
    }

    // TRACK BY COMPLAINT CODE (USER FEATURE)
    @GetMapping("/track/{code}")
    public Complaint trackComplaint(@PathVariable String code) {
        return complaintService.trackByCode(code);
    }
}