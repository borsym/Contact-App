package com.contact.list.backend.controller;

import com.contact.list.backend.dto.UserDTO;
import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.service.imp.UserServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImp userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable UUID userId) {
        UserDTO users = userService.getUserById(userId);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }


    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<UserEntity> createUser(@Valid  @RequestPart("user") UserEntity user, @RequestPart("file") MultipartFile file) throws IOException {
        UserEntity createdUser = userService.createUser(user, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<UserEntity> updateUser(@PathVariable UUID userId, @RequestPart("file") MultipartFile file, @Valid @RequestPart("user") UserEntity user) throws IOException {
        UserEntity updatedContact = userService.updateUser(userId, user, file);
        return ResponseEntity.ok(updatedContact);
    }
}
