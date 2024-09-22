package com.contact.list.backend.service;

import com.contact.list.backend.model.ContactEntity;

import java.util.List;
import java.util.UUID;

public interface ContactService {
    ContactEntity createContact(UUID userId, ContactEntity contact);
    List<ContactEntity> getContactsByUserId(UUID userId);
    ContactEntity getContactById(UUID contactId);
    ContactEntity updateContact(UUID contactId, ContactEntity contactDetails);
    void deleteContact(UUID contactId);
}
