package com.contact.list.backend.repository;

import com.contact.list.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    boolean existsByEmailAndIdNot(String email, UUID userId);
    boolean existsByPhoneNumberAndIdNot(String phoneNumber, UUID userId);
    boolean existsByEmailOrPhoneNumber(String email, String phoneNumber);
}