# base 이미지 설정
FROM openjdk:17-jdk-alpine

# jar 파일 위치를 변수로 설정
ARG JAR_FILE=build/*.

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
