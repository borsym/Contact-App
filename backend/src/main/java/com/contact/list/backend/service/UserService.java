package com.contact.list.backend.service;

import com.contact.list.backend.dto.UserDTO;
import com.contact.list.backend.model.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDTO> getAllUsers();

    UserDTO getUserById(UUID id);

    UserEntity createUser(UserEntity user, MultipartFile file) throws IOException;

    UserEntity updateUser(UUID userId, UserEntity userDetails, MultipartFile file) throws IOException;

    void deleteUser(UUID userId);
}
