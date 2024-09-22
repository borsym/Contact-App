package com.contact.list.backend.controller;

import com.contact.list.backend.model.ContactEntity;
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
    public ResponseEntity<List<ContactEntity>> getContactsByUserId(@PathVariable UUID userId) {
        List<ContactEntity> contacts = contactService.getContactsByUserId(userId);
        return ResponseEntity.ok(contacts);
    }

    @PostMapping("/users/{userId}")
    public ResponseEntity<ContactEntity> createContact(@PathVariable UUID userId, @RequestBody ContactEntity contact) {
        ContactEntity createdContact = contactService.createContact(userId, contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdContact);
    }

    @PutMapping("/{contactId}")
    public ResponseEntity<ContactEntity> updateContact(@PathVariable UUID contactId, @RequestBody ContactEntity contactDetails) {
        ContactEntity updatedContact = contactService.updateContact(contactId, contactDetails);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable UUID contactId) {
        contactService.deleteContact(contactId);
        return ResponseEntity.noContent().build();
    }
}
