package com.contact.list.backend.service.imp;


import com.contact.list.backend.service.S3Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3ConfigImp implements S3Config {
    @Value("${aws.access-key-id}")
    private String awsAccessKey;

    @Value("${aws.secret-access-key}")
    private String awsSecretKey;

    @Value("${aws.s3.region}")
    private String region;

    @Override
    @Bean
    public S3Client s3Client() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(awsAccessKey, awsSecretKey);

        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    @Override
    @Bean
    public S3Presigner s3Presigner() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(awsAccessKey, awsSecretKey);

        return S3Presigner.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }
}
