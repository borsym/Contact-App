package com.contact.list.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class ContactDTO {
    private UUID id;
    private String name;
    private String email;
    private String phoneNumber;
    private String imageName;
}
