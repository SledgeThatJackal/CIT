FROM eclipse-temurin:17-jre-focal

WORKDIR /app

COPY target/cit.jar /app/cit.jar

COPY private.key /app/config/private.key

ENV APP_ENV=docker

EXPOSE 8080

RUN chmod 600 /app/config/private.key

ENTRYPOINT ["java", "-jar", "/app/cit.jar"]