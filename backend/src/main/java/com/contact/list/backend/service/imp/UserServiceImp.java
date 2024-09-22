package com.contact.list.backend.service.imp;

import com.contact.list.backend.model.UserEntity;
import com.contact.list.backend.repository.UserRepository;
import com.contact.list.backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public UserEntity updateUser(UUID userId, UserEntity userDetails) {
        UserEntity existingUser = getUserById(userId);
        UserEntity updatedUser = UserEntity.builder()
                .id(existingUser.getId())
                .name(userDetails.getName())
                .email(userDetails.getEmail())
                .phoneNumber(userDetails.getPhoneNumber())
                .imageName(userDetails.getImageName())
                .password(userDetails.getPassword()) // TODO hash
                .build();

        return userRepository.save(updatedUser);
    }

    @Override
    public void deleteUser(UUID userId) {
        userRepository.deleteById(userId);
    }
}
