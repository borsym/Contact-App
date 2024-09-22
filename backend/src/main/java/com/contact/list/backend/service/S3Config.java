package com.contact.list.backend.service;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

public interface S3Config {
    S3Client s3Client();
    S3Presigner s3Presigner();
}
