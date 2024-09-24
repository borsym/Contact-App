package com.contact.list.backend;


import com.contact.list.backend.dto.UserDTO;
import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.repository.UserRepository;
import com.contact.list.backend.service.S3Service;
import com.contact.list.backend.service.imp.UserServiceImp;
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
import static com.contact.list.backend.TestConstants.TEST_PHONE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceImpTest extends BaseTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private S3Service s3Service;

    @InjectMocks
    private UserServiceImp userService;


    @Test
    void getAllUsers() {
        UserEntity user1 = TestUtils.createUserEntity(TEST_USER_ID, TEST_NAME, TEST_EMAIL, TEST_PHONE); //UserEntity.builder().name("New User").email("new@example.com").phoneNumber("1234567890").build();
        UserEntity user2 = TestUtils.createUserEntity(TEST_USER_ID, TEST_NAME_2, TEST_EMAIL_2, TEST_PHONE_2); //UserEntity.builder().name("New User").email("new@example.com").phoneNumber("1234567890").build();

        List<UserEntity> users = Arrays.asList(user1, user2);

        when(userRepository.findAll()).thenReturn(users);
        when(s3Service.getPresignedUrl(anyString())).thenReturn(TEST_IMAGE_NAME);

        List<UserDTO> result = userService.getAllUsers();

        assertEquals(2, result.size());
        assertEquals(user1.getName(), result.get(0).getName());
        assertEquals(user2.getName(), result.get(1).getName());
    }

    @Test
    void getUserById() {
        UUID userId = TEST_USER_ID;
        UserEntity user = TestUtils.createUserEntity(userId, TEST_NAME, TEST_EMAIL, TEST_PHONE);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(s3Service.getPresignedUrl(anyString())).thenReturn(TEST_IMAGE_NAME);

        UserDTO result = userService.getUserById(userId);

        assertEquals(user.getName(), result.getName());
        assertEquals(user.getEmail(), result.getEmail());
    }

    @Test
    void createUser() throws IOException {
        UserEntity user = TestUtils.createUserEntity(TEST_USER_ID, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        MultipartFile file = TestUtils.createMockMultipartFile();

        when(s3Service.uploadFile(file)).thenReturn(TEST_IMAGE_NAME);
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);

        UserEntity result = userService.createUser(user, file);

        assertEquals(user.getName(), result.getName());
        assertEquals(user.getEmail(), result.getEmail());
        assertEquals(TEST_IMAGE_NAME, result.getImageName());
    }

    @Test
    void updateUser() throws IOException {
        UUID userId = TEST_USER_ID;
        UserEntity existingUser = TestUtils.createUserEntity(userId, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        UserEntity updatedUser = TestUtils.createUserEntity(TEST_USER_ID, TEST_NAME_2, TEST_EMAIL_2, TEST_PHONE_2);
        MultipartFile file = TestUtils.createMockMultipartFile();

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(s3Service.uploadFile(file)).thenReturn(TEST_IMAGE_NAME);
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> {
            UserEntity savedUser = invocation.getArgument(0);
            savedUser.setImageName(TEST_IMAGE_NAME);
            return savedUser;
        });
        UserEntity result = userService.updateUser(userId, updatedUser, file);

        assertEquals(updatedUser.getName(), result.getName());
        assertEquals(updatedUser.getEmail(), result.getEmail());
        assertEquals(TEST_IMAGE_NAME, result.getImageName());
    }

    @Test
    void deleteUser() {
        UUID userId = TEST_USER_ID;
        UserEntity user = TestUtils.createUserEntity(userId, TEST_NAME, TEST_EMAIL, TEST_PHONE, TEST_IMAGE_NAME);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.deleteUser(userId);

        verify(s3Service).deleteFile(TEST_IMAGE_NAME);
        verify(userRepository).deleteById(userId);
    }
}
