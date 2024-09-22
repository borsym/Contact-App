package com.contact.list.backend.service.imp;

import com.contact.list.backend.model.Contact;
import com.contact.list.backend.model.User;
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
    public Contact createContact(UUID userId, Contact contact) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        contact.setUser(user);
        return contactRepository.save(contact);
    }

    @Override
    public List<Contact> getContactsByUserId(UUID userId) {
        return contactRepository.findByUserId(userId);
    }

    @Override
    public Contact getContactById(UUID contactId) {
        return contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    @Override
    public Contact updateContact(UUID contactId, Contact contactDetails) {
        Contact existingContact = getContactById(contactId);

        Contact updatedContact = Contact.builder()
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
