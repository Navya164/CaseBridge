package com.casebridge.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity

public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String title;

    private String description;

    private String status;

    private String complaintCode;
    private Long userId;

    private LocalDateTime createdAt;
    private String reviewAction;
    private String officerNote;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getComplaintCode() {
    return complaintCode;
}

public void setComplaintCode(String complaintCode) {
    this.complaintCode = complaintCode;
}
public Long getUserId() {
    return userId;
}

public void setUserId(Long userId) {
    this.userId = userId;
}

public LocalDateTime getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
}
public String getReviewAction() {
    return reviewAction;
}

public void setReviewAction(String reviewAction) {
    this.reviewAction = reviewAction;
}

public String getOfficerNote() {
    return officerNote;
}

public void setOfficerNote(String officerNote) {
    this.officerNote = officerNote;
}
}