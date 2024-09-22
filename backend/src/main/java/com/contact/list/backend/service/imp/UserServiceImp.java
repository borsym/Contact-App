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
        return users.stream().map(user -> UserDTO.builder().id(user.getId()).name(user.getName()).email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .imageName(user.getImageName() != null ?
                        s3Service.getPresignedUrl(user.getImageName()) : null).build()).toList();
    }

    @Override
    public UserEntity getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public UserEntity createUser(UserEntity user, MultipartFile file) throws IOException {
        // TODO hash password
        if (file != null && !file.isEmpty()) {
            String imageUrl = s3Service.uploadFile(file);
            user.setImageName(imageUrl);
        }
        return userRepository.save(user);
    }
    @Override
    public UserEntity updateUser(UUID userId, UserEntity userDetails, MultipartFile file) throws IOException {
        UserEntity existingUser = getUserById(userId);
        UserEntity.UserEntityBuilder userBuilder = UserEntity.builder()
                .id(existingUser.getId())
                .name(userDetails.getName())
                .email(userDetails.getEmail())
                .phoneNumber(userDetails.getPhoneNumber());

        if (file != null && !file.isEmpty()) {
            String imageUrl = s3Service.uploadFile(file);
            userBuilder.imageName(imageUrl);
            // TODO remove previous image.
        }

        UserEntity updatedContact = userBuilder.build();
        return userRepository.save(updatedContact);
    }

    @Override
    public void deleteUser(UUID userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));;

        if (user.getImageName() != null) {
            s3Service.deleteFile(user.getImageName());
        }
        userRepository.deleteById(userId);
    }
}
