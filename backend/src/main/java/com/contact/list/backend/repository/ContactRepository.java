package com.contact.list.backend.repository;

import com.contact.list.backend.model.ContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContactRepository extends JpaRepository<ContactEntity, UUID> {
    List<ContactEntity> findByUserId(UUID userId);

    boolean existsByEmailOrPhoneNumber(String email, String phoneNumber);
}
