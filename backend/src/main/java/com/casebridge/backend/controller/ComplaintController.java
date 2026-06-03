package com.casebridge.backend.controller;

import com.casebridge.backend.entity.Complaint;
import com.casebridge.backend.repository.ComplaintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin

public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @PostMapping
    public Complaint createComplaint(
            @RequestBody Complaint complaint) {

        complaint.setStatus("PENDING");

        return complaintRepository.save(complaint);
    }

    @GetMapping
    public Object getComplaints() {

        return complaintRepository.findAll();
    }
    @PutMapping("/{id}")

public Complaint updateStatus(

        @PathVariable Long id,

        @RequestBody Complaint updatedComplaint
) {

    Complaint complaint =
            complaintRepository
                    .findById(id)
                    .orElseThrow();

    complaint.setStatus(
            updatedComplaint.getStatus()
    );

    return complaintRepository.save(complaint);
}
@GetMapping("/search/{keyword}")

public Object searchComplaints(
        @PathVariable String keyword
) {

    return complaintRepository
            .findByTitleContaining(keyword);
}


@PutMapping("/{id}/status")
public Complaint updateStatus(
        @PathVariable Long id,
        @RequestParam String status
) {

    Complaint complaint =
            complaintRepository.findById(id).orElseThrow();

    complaint.setStatus(status);

    return complaintRepository.save(complaint);
}
}