package com.contact.list.backend.service;

import com.contact.list.backend.dto.ContactDTO;
import com.contact.list.backend.model.ContactEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ContactService {
    List<ContactDTO> getContactsByUserId(UUID userId);
    ContactEntity getContactById(UUID contactId);
    ContactEntity createContact(UUID userId, ContactEntity contact, MultipartFile file) throws IOException;
    ContactEntity updateContact(UUID contactId, ContactEntity contactDetails, MultipartFile file) throws IOException;
    void deleteContact(UUID contactId);
}
