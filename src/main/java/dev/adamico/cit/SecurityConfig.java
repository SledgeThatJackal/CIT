package dev.adamico.cit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${admin.username}")
    private String username;

    @Value("${admin.password}")
    private String password;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth ->
                    auth.requestMatchers("/*.css", "/*.js", "/*.ico", "/index.html").permitAll()
                        .requestMatchers("/login", "/logout").permitAll()
                        .requestMatchers("/api/zip").permitAll()
                        .anyRequest()
                        .authenticated())
            .formLogin(login -> login.loginPage("/login")
                    .defaultSuccessUrl("/", true)
                    .failureUrl("/login?error=true")
                    .permitAll())
            .logout(logout -> logout.logoutUrl("/logout")
                    .logoutSuccessUrl("/login?logout=true")
                    .clearAuthentication(true)
                    .deleteCookies("JSESSIONID")
                    .permitAll());

        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsManager(PasswordEncoder passwordEncoder){
        UserDetails user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
