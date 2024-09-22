package com.contact.list.backend.controller;

import com.contact.list.backend.model.Contact;
import com.contact.list.backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<Contact>> getContactsByUserId(@PathVariable UUID userId) {
        List<Contact> contacts = contactService.getContactsByUserId(userId);
        return ResponseEntity.ok(contacts);
    }

    @PostMapping("/users/{userId}")
    public ResponseEntity<Contact> createContact(@PathVariable UUID userId, @RequestBody Contact contact) {
        Contact createdContact = contactService.createContact(userId, contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdContact);
    }

    @PutMapping("/{contactId}")
    public ResponseEntity<Contact> updateContact(@PathVariable UUID contactId, @RequestBody Contact contactDetails) {
        Contact updatedContact = contactService.updateContact(contactId, contactDetails);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable UUID contactId) {
        contactService.deleteContact(contactId);
        return ResponseEntity.noContent().build();
    }
}
