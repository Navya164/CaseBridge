package com.casebridge.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ComplaintAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long complaintId;

    private Long officerId;

    private LocalDateTime assignedDate =
            LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }

    public Long getOfficerId() {
        return officerId;
    }

    public void setOfficerId(Long officerId) {
        this.officerId = officerId;
    }

    public LocalDateTime getAssignedDate() {
        return assignedDate;
    }
}