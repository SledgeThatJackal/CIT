package dev.adamico.cit;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.SpringDataJacksonConfiguration;
import org.springframework.data.web.config.SpringDataWebSettings;

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper(SpringDataWebSettings springDataWebSettings) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new SpringDataJacksonConfiguration.PageModule(springDataWebSettings));
        return objectMapper;
    }
}
