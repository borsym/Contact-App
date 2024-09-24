package com.contact.list.backend;

import com.contact.list.backend.dto.ContactDTO;
import com.contact.list.backend.dto.UserDTO;
import com.contact.list.backend.model.ContactEntity;
import com.contact.list.backend.model.UserEntity;
import org.springframework.web.multipart.MultipartFile;


import java.util.UUID;

import static org.mockito.Mockito.mock;

public class TestUtils {

    public static ContactDTO createContactDTO(UUID id, String name, String email, String phone) {
        return ContactDTO.builder()
                .id(id)
                .name(name)
                .email(email)
                .phoneNumber(phone)
                .build();
    }

    public static UserDTO createUserDTO(UUID id, String name, String email, String phone) {
        return UserDTO.builder()
                .id(id)
                .name(name)
                .email(email)
                .phoneNumber(phone)
                .build();
    }

    public static ContactEntity createContactEntity(UUID id, String name, String email, String phone) {
        return createContactEntity(id, name, email, phone, null);
    }

    public static ContactEntity createContactEntity(UUID id, String name, String email, String phone, String imageName) {
        return ContactEntity.builder()
                .id(id)
                .name(name)
                .email(email)
                .phoneNumber(phone)
                .imageName(imageName)
                .build();
    }

    public static UserEntity createUserEntity(UUID id, String name, String email, String phone) {
        return createUserEntity(id, name, email, phone, null);
    }

    public static UserEntity createUserEntity(UUID id, String name, String email, String phone, String imageName) {
        return UserEntity.builder()
                .id(id)
                .name(name)
                .email(email)
                .phoneNumber(phone)
                .imageName(imageName)
                .build();
    }

    public static MultipartFile createMockMultipartFile() {
        return mock(MultipartFile.class);
    }
}
