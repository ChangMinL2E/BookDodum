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
#

FROM gradle:7.6.1-jdk17-alpine as build

# build stage
WORKDIR /home/gradle/project
COPY build.gradle.kts settings.gradle.kts ./
COPY src ./src
RUN gradle clean build

# production stage
FROM openjdk:17-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
COPY --from=build ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]