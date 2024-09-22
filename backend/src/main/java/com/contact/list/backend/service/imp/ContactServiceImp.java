package com.contact.list.backend.service.imp;

import com.contact.list.backend.model.ContactEntity;
import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.repository.ContactRepository;
import com.contact.list.backend.repository.UserRepository;
import com.contact.list.backend.service.ContactService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ContactServiceImp implements ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    @Override
    public ContactEntity createContact(UUID userId, ContactEntity contact) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        contact.setUser(user);
        return contactRepository.save(contact);
    }

    @Override
    public List<ContactEntity> getContactsByUserId(UUID userId) {
        return contactRepository.findByUserId(userId);
    }

    @Override
    public ContactEntity getContactById(UUID contactId) {
        return contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    @Override
    public ContactEntity updateContact(UUID contactId, ContactEntity contactDetails) {
        ContactEntity existingContact = getContactById(contactId);

        ContactEntity updatedContact = ContactEntity.builder()
                .id(existingContact.getId())
                .name(contactDetails.getName())
                .email(contactDetails.getEmail())
                .phoneNumber(contactDetails.getPhoneNumber())
                .imageName(contactDetails.getImageName())
                .user(existingContact.getUser())
                .build();

        return contactRepository.save(updatedContact);
    }

    @Override
    public void deleteContact(UUID contactId) {
        contactRepository.deleteById(contactId);
    }
}
