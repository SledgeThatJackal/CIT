FROM eclipse-temurin:17-jre-focal

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

RUN npm install -g npm@latest

RUN apt-get install -y wget ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 \
    libxrandr2 xdg-utils libgbm-dev libgbm1

COPY target/cit.jar /app/cit.jar

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

ENV APP_ENV=docker

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/cit.jar"]