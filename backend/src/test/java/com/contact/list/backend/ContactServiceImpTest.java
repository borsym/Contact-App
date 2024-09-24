package com.contact.list.backend;

import com.contact.list.backend.dto.ContactDTO;
import com.contact.list.backend.model.ContactEntity;
import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.repository.ContactRepository;
import com.contact.list.backend.repository.UserRepository;
import com.contact.list.backend.service.S3Service;
import com.contact.list.backend.service.imp.ContactServiceImp;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.contact.list.backend.TestConstants.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContactServiceImpTest extends BaseTest {

    @Mock
    private ContactRepository contactRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private S3Service s3Service;

    @InjectMocks
    private ContactServiceImp contactService;

    @Test
    void createContact() throws IOException {
        UUID userId = TEST_USER_ID;
        UserEntity user = UserEntity.builder().id(userId).build();
        ContactEntity contact = TestUtils.createContactEntity(userId, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        MultipartFile file = TestUtils.createMockMultipartFile();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(s3Service.uploadFile(file)).thenReturn(TEST_IMAGE_NAME);
        when(contactRepository.save(any(ContactEntity.class))).thenReturn(contact);

        ContactEntity result = contactService.createContact(userId, contact, file);

        assertEquals(contact.getName(), result.getName());
        assertEquals(contact.getEmail(), result.getEmail());
        assertEquals(TEST_IMAGE_NAME, result.getImageName());
        assertEquals(user, result.getUser());
    }

    @Test
    void getContactsByUserId() {
        UUID userId = UUID.randomUUID();
        ContactEntity contact1 = TestUtils.createContactEntity(userId, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        ContactEntity contact2 = TestUtils.createContactEntity(userId, TEST_NAME_2, TEST_EMAIL_2, TEST_PHONE_2);
        List<ContactEntity> contacts = Arrays.asList(contact1, contact2);

        when(contactRepository.findByUserId(userId)).thenReturn(contacts);
        when(s3Service.getPresignedUrl(anyString())).thenReturn(TEST_IMAGE_NAME);

        List<ContactDTO> result = contactService.getContactsByUserId(userId);

        assertEquals(2, result.size());
        assertEquals(contact1.getName(), result.get(0).getName());
        assertEquals(contact2.getName(), result.get(1).getName());
    }

    @Test
    void getContactById() {
        UUID contactId = UUID.randomUUID();
        ContactEntity contact = TestUtils.createContactEntity(contactId, TEST_NAME_2, TEST_EMAIL_2, TEST_PHONE_2);

        when(contactRepository.findById(contactId)).thenReturn(Optional.of(contact));

        ContactEntity result = contactService.getContactById(contactId);

        assertEquals(contact.getName(), result.getName());
        assertEquals(contact.getEmail(), result.getEmail());
    }

    @Test
    void updateContact() throws IOException {
        UUID contactId = UUID.randomUUID();
        ContactEntity existingContact = TestUtils.createContactEntity(contactId, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        ContactEntity updatedContact = TestUtils.createContactEntity(contactId, TEST_NAME_2, TEST_EMAIL_2, TEST_PHONE_2);
        MultipartFile file = TestUtils.createMockMultipartFile();

        when(contactRepository.findById(contactId)).thenReturn(Optional.of(existingContact));
        when(s3Service.uploadFile(file)).thenReturn(TEST_IMAGE_NAME);
        when(contactRepository.save(any(ContactEntity.class))).thenAnswer(invocation -> {
            ContactEntity savedContact = invocation.getArgument(0);
            savedContact.setImageName(TEST_IMAGE_NAME);
            return savedContact;
        });

        ContactEntity result = contactService.updateContact(contactId, updatedContact, file);

        assertEquals(updatedContact.getName(), result.getName());
        assertEquals(updatedContact.getEmail(), result.getEmail());
        assertEquals(TEST_IMAGE_NAME, result.getImageName());
    }

    @Test
    void deleteContact() {
        UUID contactId = UUID.randomUUID();
        ContactEntity contact = TestUtils.createContactEntity(contactId, TEST_NAME, TEST_EMAIL, TEST_PHONE, TEST_IMAGE_NAME);

        when(contactRepository.findById(contactId)).thenReturn(Optional.of(contact));

        contactService.deleteContact(contactId);

        verify(s3Service).deleteFile(TEST_IMAGE_NAME);
        verify(contactRepository).deleteById(contactId);
    }
}
