# base 이미지 설정
FROM openjdk:17-jdk-alpine

# jar 파일 위치를 변수로 설정
ARG JAR_FILE=build/*.jar

COPY ${JAR_FILE} bookdodum-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/app.jar"]
