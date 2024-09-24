package com.contact.list.backend;

import com.contact.list.backend.controller.UserController;
import com.contact.list.backend.dto.UserDTO;
import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.service.imp.UserServiceImp;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static com.contact.list.backend.TestConstants.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest extends BaseTest {

    @Mock
    private UserServiceImp userService;

    @InjectMocks
    private UserController userController;


    @Test
    void getAllUsers() {
        UserDTO user1 = TestUtils.createUserDTO(TEST_USER_ID, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        UserDTO user2 = TestUtils.createUserDTO(TEST_USER_ID, TEST_NAME_2, TEST_EMAIL_2, TEST_PHONE_2);
        List<UserDTO> users = Arrays.asList(user1, user2);

        when(userService.getAllUsers()).thenReturn(users);

        ResponseEntity<List<UserDTO>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @Test
    void getUser() {
        UUID userId = TEST_USER_ID;
        UserDTO user = TestUtils.createUserDTO(userId, TEST_NAME, TEST_EMAIL, TEST_PHONE);

        when(userService.getUserById(userId)).thenReturn(user);

        ResponseEntity<UserDTO> response = userController.getUser(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user.getName(), response.getBody().getName());
    }

    @Test
    void deleteUser() {
        UUID userId = UUID.randomUUID();

        ResponseEntity<Void> response = userController.deleteUser(userId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userService).deleteUser(userId);
    }

    @Test
    void createUser() throws IOException {
        UserEntity user = TestUtils.createUserEntity(TEST_USER_ID, TEST_NAME, TEST_EMAIL, TEST_PHONE); //UserEntity.builder().name("New User").email("new@example.com").phoneNumber("1234567890").build();

        MultipartFile file = TestUtils.createMockMultipartFile();

        when(userService.createUser(user, file)).thenReturn(user);

        ResponseEntity<UserEntity> response = userController.createUser(user, file);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(user.getName(), response.getBody().getName());
    }

    @Test
    void updateUser() throws IOException {
        UUID userId = TEST_USER_ID;
        UserEntity user = TestUtils.createUserEntity(userId, TEST_NAME, TEST_EMAIL, TEST_PHONE);
        MultipartFile file = TestUtils.createMockMultipartFile();

        when(userService.updateUser(userId, user, file)).thenReturn(user);

        ResponseEntity<UserEntity> response = userController.updateUser(userId, file, user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user.getName(), response.getBody().getName());
    }
}
