package com.contact.list.backend.controller;

import com.contact.list.backend.dto.ContactDTO;
import com.contact.list.backend.model.ContactEntity;
import com.contact.list.backend.service.imp.ContactServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final ContactServiceImp contactService;

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<ContactDTO>> getContactsByUserId(@PathVariable UUID userId) {
        List<ContactDTO> contacts = contactService.getContactsByUserId(userId);
        return ResponseEntity.ok(contacts);
    }
    @PostMapping(value = "/users/{userId}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ContactEntity> createContact(@PathVariable UUID userId,
                                                       @Valid @RequestPart("file") MultipartFile file,
                                                       @Valid @RequestPart("contact") ContactEntity contact) throws IOException {
        ContactEntity createdContact = contactService.createContact(userId, contact, file); // Save contact
        return ResponseEntity.ok(createdContact);
    }

    @PutMapping(value = "/{contactId}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ContactEntity> updateContact(@PathVariable UUID contactId, @RequestPart("file") MultipartFile file, @Valid @RequestPart("contact") ContactEntity contact) throws IOException {
        ContactEntity updatedContact = contactService.updateContact(contactId, contact, file);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable UUID contactId) {
        contactService.deleteContact(contactId);
        return ResponseEntity.noContent().build();
    }
}
