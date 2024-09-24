package com.contact.list.backend;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.MockitoAnnotations;

public abstract class BaseTest {

    @BeforeEach
    void initMocks() {
        MockitoAnnotations.openMocks(this);
    }
}