package com.contact.list.backend.service.imp;

import com.contact.list.backend.dto.UserDTO;
import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.repository.UserRepository;
import com.contact.list.backend.service.S3Service;
import com.contact.list.backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.contact.list.backend.exception.CustomException;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final S3Service s3Service;

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return (List<UserDTO>) users.stream().map(user -> UserDTO.builder().id(user.getId()).name(user.getName()).email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .imageName(user.getImageName() != null ?
                        s3Service.getPresignedUrl(user.getImageName()) : null).build()).toList();
    }

    @Override
    public UserDTO getUserById(UUID id) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.builder().id(user.getId()).name(user.getName()).email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .imageName(user.getImageName() != null ?
                        s3Service.getPresignedUrl(user.getImageName()) : null).build();
    }

    @Override
    public UserEntity createUser(UserEntity user, MultipartFile file) throws IOException {
        if (userRepository.existsByEmailOrPhoneNumber(user.getEmail(), user.getPhoneNumber())) {
            throw new CustomException("Email or phone number already exists", HttpStatus.CONFLICT);
        }

        // TODO hash password
        if (file != null && !file.isEmpty()) {
            String imageUrl = s3Service.uploadFile(file);
            user.setImageName(imageUrl);
        }
        return userRepository.save(user);
    }

    @Override
    public UserEntity updateUser(UUID userId, UserEntity userDetails, MultipartFile file) throws IOException {
        UserEntity existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        if (!existingUser.getEmail().equals(userDetails.getEmail()) ||
                !existingUser.getPhoneNumber().equals(userDetails.getPhoneNumber())) {
            if (userRepository.existsByEmailOrPhoneNumberAndIdNot(userDetails.getEmail(), userDetails.getPhoneNumber(), userId)) {
                throw new CustomException("Email or phone number already exists", HttpStatus.CONFLICT);
            }
        }

        UserEntity.UserEntityBuilder userBuilder = UserEntity.builder()
                .id(existingUser.getId())
                .name(userDetails.getName())
                .email(userDetails.getEmail())
                .phoneNumber(userDetails.getPhoneNumber())
                .password(existingUser.getPassword());

        if (file != null && !file.isEmpty()) {
            if (existingUser.getImageName() != null) {
                s3Service.deleteFile(existingUser.getImageName());
            }
            String imageUrl = s3Service.uploadFile(file);
            userBuilder.imageName(imageUrl);
        }

        UserEntity updatedUser = userBuilder.build();
        return userRepository.save(updatedUser);
    }

    @Override
    public void deleteUser(UUID userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        if (user.getImageName() != null) {
            s3Service.deleteFile(user.getImageName());
        }

        // TODO: delete contacts
        userRepository.deleteById(userId);
    }
}
