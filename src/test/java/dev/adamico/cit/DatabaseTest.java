package dev.adamico.cit;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

public class DatabaseTest {
    static PostgreSQLContainer<?> postgreSQLContainer = new PostgreSQLContainer<>(DockerImageName.parse("postgres:16"))
            .withDatabaseName("spring-cit-test-db")
            .withUsername("username")
            .withPassword("password");

    static {
        postgreSQLContainer.start();
    }
}
