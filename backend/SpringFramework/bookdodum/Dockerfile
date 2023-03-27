# base 이미지 설정
# FROM openjdk:17-jdk-alpine
FROM gradle:7.6.1-jdk17-alpine as builder

RUN gradle clean build

# jar 파일 위치를 변수로 설정
ARG JAR_FILE=build/*.jar

COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","./app.jar"]
