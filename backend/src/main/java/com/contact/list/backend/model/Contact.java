package com.contact.list.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@SuperBuilder
@Table(name = "contacts")
public class Contact extends Person {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}