package com.contact.list.backend.service.imp;

import com.contact.list.backend.dto.ContactDTO;
import com.contact.list.backend.exception.CustomException;
import com.contact.list.backend.model.ContactEntity;
import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.repository.ContactRepository;
import com.contact.list.backend.repository.UserRepository;
import com.contact.list.backend.service.ContactService;
import com.contact.list.backend.service.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ContactServiceImp implements ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    @Override
    public ContactEntity createContact(UUID userId, ContactEntity contact, MultipartFile file) throws IOException {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (contactRepository.existsByEmailOrPhoneNumber(contact.getEmail(), contact.getPhoneNumber())) {
            throw new CustomException("Email or phone number already exists", HttpStatus.CONFLICT);
        }

        contact.setUser(user);

        if (file != null && !file.isEmpty()) {
            String imageUrl = s3Service.uploadFile(file);
            contact.setImageName(imageUrl);
        }

        return contactRepository.save(contact);
    }

    @Override
    public List<ContactDTO> getContactsByUserId(UUID userId) {
        List<ContactEntity> contacts = contactRepository.findByUserId(userId);
        return (List<ContactDTO>) contacts.stream().map(user -> ContactDTO.builder().id(user.getId()).name(user.getName()).email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .imageName(user.getImageName() != null ?
                        s3Service.getPresignedUrl(user.getImageName()) : null).build()).toList();

    }

    @Override
    public ContactEntity getContactById(UUID contactId) {
        return contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    @Override
    public ContactEntity updateContact(UUID contactId, ContactEntity contactDetails, MultipartFile file) throws IOException {
        ContactEntity existingContact = getContactById(contactId);

        if (!existingContact.getEmail().equals(contactDetails.getEmail()) ||
                !existingContact.getPhoneNumber().equals(contactDetails.getPhoneNumber())) {
            if (contactRepository.existsByEmailOrPhoneNumber(contactDetails.getEmail(), contactDetails.getPhoneNumber())) {
                throw new CustomException("Email or phone number already exists", HttpStatus.CONFLICT);
            }
        }

        ContactEntity.ContactEntityBuilder contactBuilder = ContactEntity.builder()
                .id(existingContact.getId())
                .name(contactDetails.getName())
                .email(contactDetails.getEmail())
                .phoneNumber(contactDetails.getPhoneNumber())
                .user(existingContact.getUser());

        if (file != null && !file.isEmpty()) {
            if (existingContact.getImageName() != null) {
                s3Service.deleteFile(existingContact.getImageName());
            }
            String imageUrl = s3Service.uploadFile(file);
            contactBuilder.imageName(imageUrl);
        }


        ContactEntity updatedContact = contactBuilder.build();
        return contactRepository.save(updatedContact);
    }

    @Override
    public void deleteContact(UUID contactId) {
        ContactEntity contact = contactRepository.findById(contactId).orElseThrow(() -> new RuntimeException("Contact not found"));
        ;

        if (contact.getImageName() != null) {
            s3Service.deleteFile(contact.getImageName());
        }

        contactRepository.deleteById(contactId);
    }
}
