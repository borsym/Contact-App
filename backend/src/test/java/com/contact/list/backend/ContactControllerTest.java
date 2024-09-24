package com.contact.list.backend;


import com.contact.list.backend.controller.ContactController;
import com.contact.list.backend.dto.ContactDTO;
import com.contact.list.backend.model.ContactEntity;
import com.contact.list.backend.service.imp.ContactServiceImp;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static com.contact.list.backend.TestConstants.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContactControllerTest extends  BaseTest{

    @Mock
    private ContactServiceImp contactService;

    @InjectMocks
    private ContactController contactController;


    @Test
    void getContactsByUserId() {
        UUID userId = TEST_USER_ID;

        ContactDTO contact1 = TestUtils.createContactDTO(TEST_USER_ID, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        ContactDTO contact2 = TestUtils.createContactDTO(userId, TEST_NAME_2, TEST_EMAIL_2, TEST_PHONE_2);
        List<ContactDTO> contacts = Arrays.asList(contact1, contact2);

        when(contactService.getContactsByUserId(userId)).thenReturn(contacts);

        ResponseEntity<List<ContactDTO>> response = contactController.getContactsByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @Test
    void createContact() throws IOException {
        UUID userId = TEST_USER_ID;
        ContactEntity contact = TestUtils.createContactEntity(userId, TEST_NAME,TEST_EMAIL,TEST_PHONE, TEST_IMAGE_NAME);
        MultipartFile file = TestUtils.createMockMultipartFile();

        when(contactService.createContact(userId, contact, file)).thenReturn(contact);

        ResponseEntity<ContactEntity> response = contactController.createContact(userId, file, contact);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contact.getName(), response.getBody().getName());
    }

    @Test
    void updateContact() throws IOException {
        UUID contactId = UUID.randomUUID();
        ContactEntity contact = TestUtils.createContactEntity(contactId, TEST_NAME,TEST_EMAIL,TEST_PHONE, TEST_IMAGE_NAME);
        MultipartFile file = TestUtils.createMockMultipartFile();

        when(contactService.updateContact(contactId, contact, file)).thenReturn(contact);

        ResponseEntity<ContactEntity> response = contactController.updateContact(contactId, file, contact);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contact.getName(), response.getBody().getName());
    }

    @Test
    void deleteContact() {
        UUID contactId = UUID.randomUUID();

        ResponseEntity<Void> response = contactController.deleteContact(contactId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(contactService).deleteContact(contactId);
    }
}