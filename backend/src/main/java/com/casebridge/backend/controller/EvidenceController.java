package com.casebridge.backend.controller;

import com.casebridge.backend.entity.Complaint;
import com.casebridge.backend.entity.Evidence;
import com.casebridge.backend.repository.ComplaintRepository;
import com.casebridge.backend.repository.EvidenceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/evidence")
@CrossOrigin

public class EvidenceController {

    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @PostMapping("/{complaintId}")

    public String uploadEvidence(

            @PathVariable Long complaintId,

            @RequestParam("file") MultipartFile file

    ) throws IOException {

        Complaint complaint =
                complaintRepository
                        .findById(complaintId)
                        .orElseThrow();

        String uploadDir =
        System.getProperty("user.dir")
        + "/uploads";

File directory = new File(uploadDir);

if(!directory.exists()) {

    directory.mkdirs();
}

String filePath =
        uploadDir + "/"
        + file.getOriginalFilename();

file.transferTo(new File(filePath));

Evidence evidence = new Evidence();

evidence.setFileName(
        file.getOriginalFilename()
);

evidence.setFileType(
        file.getContentType()
);

evidence.setFilePath(
        "uploads/" + file.getOriginalFilename()
);

evidence.setComplaint(complaint);

evidenceRepository.save(evidence);

return "Evidence Uploaded Successfully";
    }
    @GetMapping("/complaint/{complaintId}")
public List<Evidence> getEvidenceByComplaint(
        @PathVariable Long complaintId
) {
    return evidenceRepository.findByComplaintId(complaintId);
}

}