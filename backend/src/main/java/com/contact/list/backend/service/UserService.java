package com.contact.list.backend.service;

import com.contact.list.backend.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(UUID id);
    User createUser(User user);
    User updateUser(UUID userId, User userDetails);
    void deleteUser(UUID userId);
}
