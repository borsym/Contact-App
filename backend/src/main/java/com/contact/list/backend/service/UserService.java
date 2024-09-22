package com.contact.list.backend.service;

import com.contact.list.backend.model.UserEntity;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserEntity> getAllUsers();
    UserEntity getUserById(UUID id);
    UserEntity createUser(UserEntity user);
    UserEntity updateUser(UUID userId, UserEntity userDetails);
    void deleteUser(UUID userId);
}
