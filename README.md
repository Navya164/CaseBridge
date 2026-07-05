# 🛡️ CaseBridge

**Secure Complaint & Case Management System**

CaseBridge is a secure web-based complaint and case management platform designed to demonstrate modern web application security principles. The application enables secure complaint registration, evidence management, role-based access control, and permission-based authorization while protecting sensitive user information through industry-standard authentication and password security mechanisms.



#  Project Objectives

- Build a secure complaint management platform.
- Protect user credentials using strong password hashing.
- Implement secure authentication using JWT.
- Restrict unauthorized access through Role-Based Access Control (RBAC).
- Support fine-grained authorization using Permission-Based Access Control (PBAC).
- Demonstrate secure backend development using Spring Security.
- Improve accountability through audit logging.



#  Security Architecture

The application follows a layered security model.

User
   │
   ▼
React Frontend
   │
JWT Token
   │
Spring Security
   │
Authentication
   │
Authorization
   │
Permission Validation
   │
REST APIs
   │
MySQL Database


Every incoming request is authenticated before business logic is executed. Authorization checks ensure that users can only access resources they are permitted to use.



  **Authentication**

* JSON Web Token (JWT)

The application uses JWT for stateless authentication.

* Login Flow

1. User enters email and password.
2. Backend verifies the credentials.
3. Password is validated using BCrypt.
4. If valid, the server generates a signed JWT.
5. JWT is returned to the client.
6. Frontend stores the token in Local Storage.
7. Every subsequent request includes the JWT.
8. Spring Security validates the token before granting access.

### Benefits

- Stateless authentication
- No server-side session storage
- Faster request processing
- Secure API communication
- Reduced server memory usage



#  Password Security

Passwords are protected using BCrypt Hashing.

Instead of storing passwords directly,

Password


they are stored as


$2a$10$...


Each password is hashed with a unique random salt, ensuring that even identical passwords produce different hashes.

During login,

- User enters password
- BCrypt extracts the stored salt
- Password is hashed again
- Hashes are compared securely

No password decryption is ever performed.



#  Role-Based Access Control (RBAC)

The system supports three different user roles.

### Admin

- Manage Users
- Assign Officers
- Assign Permissions
- View Analytics
- Download Reports
- Manage Complaints

### Officer

- View Assigned Complaints
- Update Complaint Status
- Manage Investigation

### User

- Register Complaint
- Upload Evidence
- Track Complaint Status

Each role is redirected to its dedicated dashboard after successful authentication.



#  Permission-Based Access Control (PBAC)

Beyond roles, every feature is protected using dynamic permissions.

Examples include:

- VIEW_ANALYTICS
- DOWNLOAD_REPORT
- PRINT_REPORT
- ASSIGN_OFFICER
- MANAGE_USERS
- UPDATE_STATUS

Permissions are assigned by the administrator and stored in the database.

During page loading,

1. Frontend requests user permissions.
2. Backend returns assigned permissions.
3. Utility methods verify access.
4. Unauthorized buttons and pages remain hidden.

This allows permissions to be modified without changing application code.



#  Complaint Workflow

User
   │
Registers Complaint
   │
Uploads Evidence
   │
Complaint Stored
   │
Admin Reviews
   │
Assigns Officer
   │
Officer Investigates
   │
Status Updated
   │
User Tracks Progress

#  Audit Logging

Important user activities are recorded, including:

- Login
- Complaint Creation
- Evidence Upload
- Officer Assignment
- Permission Assignment

Audit logs improve accountability and help monitor critical system operations.



# Security Features Implemented

✔ JWT Authentication

✔ BCrypt Password Hashing

✔ Spring Security

✔ Role-Based Access Control

✔ Dynamic Permission Management

✔ REST API Security

✔ Secure Authentication Flow

✔ Audit Logging

✔ Protected Admin Operations

✔ Secure Password Storage


⚙ Technology Stack

### Frontend

- React.js
- JavaScript
- Axios
- HTML5
- CSS3

### Backend

- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs

### Database

- MySQL

### Security

- JWT
- BCrypt
- Spring Security




#  Future Security Enhancements

- Two-Factor Authentication (2FA)
- Refresh Tokens
- Account Lockout After Failed Login Attempts
- Password Reset via Email
- AES Encryption for Sensitive Evidence Files
- CAPTCHA Protection
- Multi-Factor Authentication
- OAuth2 / Single Sign-On
- Secure File Malware Scanning
- Security Monitoring Dashboard




