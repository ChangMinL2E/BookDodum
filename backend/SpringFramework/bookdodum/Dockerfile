# # base 이미지 설정
# # FROM openjdk:17-jdk-alpine
# # FROM gradle:7.6.1-jdk17-alpine as builder
# # FROM gradle:7.6.1-jdk11-alpine
# FROM gradle:7.6.1-jdk17-alpine as build

# ENV APP_HOME=/apps

# WORKDIR ${APP_HOME}

# COPY build.gradle settings.gradle gradlew ${APP_HOME}

# COPY gradle ${APP_HOME}/gradle


# # RUN gradle clean build
# RUN ./gradlew clean build

# FROM openjdk:17.0.5-jdk

# # jar 파일 위치를 변수로 설정
# ARG JAR_FILE=build/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","./app.jar"]
# Gradle 빌드를 수행할 Docker 이미지를 빌드합니다.

FROM gradle:7.6.1-jdk17-alpine as build

# Gradle 빌드를 수행합니다.
WORKDIR /app
COPY build.gradle .
COPY src/ ./src/
RUN gradle build

# Jar 파일을 Docker 이미지에 복사합니다.
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# Jar 파일을 실행할 때 사용할 명령어를 지정합니다.
ENTRYPOINT ["java","-jar","./app.jar"]