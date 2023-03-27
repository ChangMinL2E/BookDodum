# # base 이미지 설정
# # FROM openjdk:17-jdk-alpine
# FROM gradle:7.4-jdk17-alpine as builder

# RUN ./gradle clean build

# # jar 파일 위치를 변수로 설정
# ARG JAR_FILE=build/*.jar

# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","./app.jar"]

FROM gradle:7.6.1-jdk17-alpine as builder

# 변수 설정
ARG JAR_FILE=build/libs/*.jar

# 빌드 스크립트 실행
RUN ./gradlew clean build

# 빌드파일을 컨테이너로 복사
COPY build/libs/*.jar /app.jar

# jar 파일 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]