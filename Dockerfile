FROM eclipse-temurin:17-jre-focal

WORKDIR /app

COPY target/cit.jar /app/cit.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/cit.jar"]