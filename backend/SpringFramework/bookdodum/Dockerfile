# base 이미지 설정
# FROM openjdk:17-jdk-alpine
# FROM gradle:7.6.1-jdk17-alpine as builder
# FROM gradle:7.6.1-jdk11-alpine
# push
# FROM gradle:7.6.1-jdk17-alpine as build

# ENV APP_HOME=/apps

# WORKDIR ${APP_HOME}

# COPY build.gradle settings.gradle gradlew ${APP_HOME}

# COPY gradle ${APP_HOME}/gradle

# RUN chmod +x gradlew

# RUN ./gradlew build || return 0

# COPY src $APP_HOME/src

# # RUN gradle clean build
# RUN ./gradlew clean build

# # FROM openjdk:17.0.5-jdk

# # jar 파일 위치를 변수로 설정
# ARG JAR_FILE=build/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","./app.jar"]

# base-image
FROM openjdk:17-jdk-alpine

# 변수 설정
ARG JAR_FILE=build/libs/*.jar

# 빌드파일을 컨테이너로 복사
COPY ${JAR_FILE} app.jar

# jar 파일 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]