package com.casebridge.backend.controller;

import com.casebridge.backend.entity.ComplaintAssignment;
import com.casebridge.backend.repository.ComplaintAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin
public class AssignmentController {

    @Autowired
    private ComplaintAssignmentRepository assignmentRepository;

    @PostMapping
    public ComplaintAssignment assignOfficer(
            @RequestBody ComplaintAssignment assignment) {

        return assignmentRepository.save(assignment);
    }

    @GetMapping
    public List<ComplaintAssignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }
    @GetMapping("/officer/{officerId}")
public List<ComplaintAssignment> getAssignmentsByOfficer(
        @PathVariable Long officerId) {

    return assignmentRepository.findByOfficerId(officerId);
}
}