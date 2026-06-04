package com.casebridge.backend.controller;

import com.casebridge.backend.entity.Permission;
import com.casebridge.backend.entity.User;
import com.casebridge.backend.entity.UserPermission;

import com.casebridge.backend.repository.PermissionRepository;
import com.casebridge.backend.repository.UserPermissionRepository;
import com.casebridge.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/permissions")
@CrossOrigin

public class PermissionController {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPermissionRepository userPermissionRepository;

    // GET ALL AVAILABLE PERMISSIONS

    @GetMapping

    public List<Permission> getAllPermissions() {

        return permissionRepository.findAll();
    }

    // ASSIGN PERMISSION TO USER

    @PostMapping("/assign")

    public String assignPermission(

            @RequestParam Long userId,

            @RequestParam Long permissionId,

            @RequestParam String endDate

    ) {

        User user =
                userRepository.findById(userId)
                        .orElseThrow();

        Permission permission =
                permissionRepository.findById(permissionId)
                        .orElseThrow();

        UserPermission userPermission =
                new UserPermission();

        userPermission.setUser(user);

        userPermission.setPermission(permission);

        userPermission.setStartDate(
                LocalDateTime.now()
        );

        userPermission.setEndDate(
                LocalDateTime.parse(endDate)
        );

        userPermission.setActive(true);

        userPermissionRepository.save(
                userPermission
        );

        return "Permission Assigned Successfully";
    }

    // GET USER ACTIVE PERMISSIONS

    @GetMapping("/user/{userId}")

public List<String> getUserPermissions(
        @PathVariable Long userId
) {

    List<UserPermission> permissions =
            userPermissionRepository
                    .findByUserIdAndActiveTrue(userId);

    return permissions.stream()

            .map(p ->
                    p.getPermission()
                            .getPermissionName()
            )

            .toList();
}

    // REVOKE PERMISSION

    @PutMapping("/revoke/{id}")

    public String revokePermission(
            @PathVariable Long id
    ) {

        UserPermission permission =
                userPermissionRepository
                        .findById(id)
                        .orElseThrow();

        permission.setActive(false);

        userPermissionRepository.save(permission);

        return "Permission Revoked";
    }
}