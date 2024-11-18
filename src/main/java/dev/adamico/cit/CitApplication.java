package dev.adamico.cit;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CitApplication {

	public static void main(String[] args) {
		String appEnv = System.getenv("APP_ENV");
		appEnv = appEnv != null ? appEnv : "local";

		Dotenv dotenv = Dotenv.configure().filename(appEnv + ".env").load();

		dotenv.entries().forEach(entry -> {
			System.setProperty(entry.getKey(), entry.getValue());
		});

		SpringApplication.run(CitApplication.class, args);
	}

}
