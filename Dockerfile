FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

COPY target/cit-0.0.1-SNAPSHOT.jar /app/cit-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/cit-0.0.1-SNAPSHOT.jar"]