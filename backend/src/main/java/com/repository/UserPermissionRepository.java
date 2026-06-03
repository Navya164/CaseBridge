package com.casebridge.backend.repository;

import com.casebridge.backend.entity.UserPermission;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPermissionRepository
extends JpaRepository<UserPermission, Long> {

    List<UserPermission> findByUserIdAndActiveTrue(
            Long userId
    );
}