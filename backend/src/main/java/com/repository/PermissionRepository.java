package com.casebridge.backend.repository;

import com.casebridge.backend.entity.Permission;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository
extends JpaRepository<Permission, Long> {

    Permission findByPermissionName(
            String permissionName
    );
}