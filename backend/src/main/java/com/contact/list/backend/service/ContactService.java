package com.contact.list.backend.service;

import com.contact.list.backend.model.Contact;

import java.util.List;
import java.util.UUID;

public interface ContactService {
    Contact createContact(UUID userId, Contact contact);
    List<Contact> getContactsByUserId(UUID userId);
    Contact getContactById(UUID contactId);
    Contact updateContact(UUID contactId, Contact contactDetails);
    void deleteContact(UUID contactId);
}
