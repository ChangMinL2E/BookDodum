# Base image
FROM gradle:7.6.1-jdk17-alpine as builder

# Set working directory
WORKDIR /app

# Copy Gradle wrapper files
COPY gradle/wrapper gradle/wrapper

# Copy build configuration files
COPY build.gradle settings.gradle ./

# Download and cache Gradle dependencies
RUN ./gradlew build || return 0

# Copy source code
COPY src ./src

# Build application
RUN ./gradlew clean build

# Change to Java runtime image
FROM openjdk:17.0.5-jdk-alpine3.14

# Set working directory
WORKDIR /app

# 변수 설정
ARG JAR_FILE=build/libs/*.jar

# 빌드파일을 컨테이너로 복사
COPY ${JAR_FILE} app.jar

# Start application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]