# # base 이미지 설정
# # FROM openjdk:17-jdk-alpine
# FROM gradle:7.4-jdk17-alpine as builder

# RUN ./gradle clean build

# # jar 파일 위치를 변수로 설정
# ARG JAR_FILE=build/*.jar

# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","./app.jar"]

# FROM gradle:7.6.1-jdk17-alpine as builder

# ENV APP_HOME=/apps

# WORKDIR $APP_HOME

# COPY build.gradle settings.gradle gradlew $APP_HOME

# COPY gradle $APP_HOME/gradle

# RUN chmod +x gradlew

# # 빌드 스크립트 실행
# RUN ./gradlew clean build

# # 변수 설정
# ARG JAR_FILE=build/libs/*.jar

# # 빌드파일을 컨테이너로 복사
# COPY build/libs/*.jar /app.jar

# # jar 파일 실행
# ENTRYPOINT ["java", "-jar", "/app.jar"]


# FROM gradle:7.6.1-jdk17-alpine as builder

# RUN apk add --no-cache curl bash

# ENV APP_HOME=/app

# WORKDIR $APP_HOME

# COPY build.gradle settings.gradle gradlew $APP_HOME

# COPY gradle $APP_HOME/gradle

# RUN chmod +x gradlew

# # 빌드 스크립트 실행
# RUN ./gradlew clean build

# # 빌드된 jar 파일 이름을 변수로 설정
# ARG JAR_FILE=build/libs/my-app.jar

# # 빌드파일을 컨테이너로 복사
# COPY $JAR_FILE $APP_HOME/app.jar

# # 필요한 경우 라이브러리 설치
# RUN apk add --no-cache openjdk17-jdk

# # jar 파일 실행
# ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]


# FROM gradle:7.4-jdk11-alpine as builder
# WORKDIR /app
# COPY . .
# RUN gradle build -x test --parallel --continue  > /dev/null 2>&1 || true
# RUN gradle clean build -x test --parallel

# APP
# FROM openjdk:11-jdk
# WORKDIR /app
# COPY --from=builder /app/build/libs/sock-0.0.1-SNAPSHOT.jar .

# root 대신 nobody 권한으로 실행
# USER nobody
# CMD ["java", "-jar", "sock-0.0.1-SNAPSHOT.jar"]



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

# 변수 설정
ARG JAR_FILE=build/libs/*.jar

# 빌드파일을 컨테이너로 복사
COPY build/libs/*.jar /app.jar

# Start application
ENTRYPOINT ["java", "-jar", "build/libs/*.jar"]