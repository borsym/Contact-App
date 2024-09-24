package com.contact.list.backend.dto;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Getter
@Setter
@SuperBuilder
@MappedSuperclass
public class PersonDTO {
    private UUID id;
    private String name;
    private String email;
    private String phoneNumber;
    private String imageName;
}
