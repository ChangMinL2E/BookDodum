## 사용할 base 이미지를 정의합니다.
#FROM openjdk:11.0.11-jdk-slim-buster
#
## 작업 디렉토리를 설정합니다.
#WORKDIR /app
#
## Gradle 빌드 스크립트 파일을 복사합니다.
#COPY build.gradle .
#COPY gradlew .
#
## Gradle 의존성을 복사합니다.
#COPY gradle gradle
#
#RUN chmod +x ./gradlew
#
## 애플리케이션을 빌드합니다.
#RUN ./gradlew build
#
##ang#test
#
## 빌드된 jar 파일을 복사합니다.
#COPY build/libs/bookdodum-0.0.1-SNAPSHOT.jar app.jar
#
## 컨테이너 실행 시 실행할 명령어를 정의합니다.
#CMD ["java", "-jar", "app.jar"]


## 사용할 base 이미지를 정의합니다.
#FROM openjdk:11.0.11-jdk-slim-buster
#
## 작업 디렉토리를 설정합니다.
#WORKDIR /app
#
## Gradle 빌드 스크립트 파일을 복사합니다.
#COPY build.gradle .
#COPY gradlew .
#
## Gradle 의존성을 복사합니다.
#COPY gradle gradle
#
## 소스 코드를 복사합니다.
#COPY src src
#
#RUN chmod +x ./gradlew
#
## 애플리케이션을 빌드합니다.
#RUN ./gradlew build
#
## 빌드된 jar 파일을 복사합니다.
#COPY build/libs/bookdodum-0.0.1-SNAPSHOT.jar app.jar
#
## 컨테이너 실행 시 실행할 명령어를 정의합니다.
#CMD ["java", "-cp", "app.jar", "com.sasatech.bookdodum.ProjectApplication"]


# 사용할 base 이미지를 정의합니다.
FROM openjdk:11.0.11-jdk-slim-buster

# 작업 디렉토리를 설정합니다.
WORKDIR /var/jenkins_home/workspace/S08P22C104/backend/SpringFramework/bookdodum

# Gradle 빌드 스크립트 파일을 복사합니다.
COPY build.gradle .
COPY gradlew .

# Gradle 의존성을 복사합니다.
COPY gradle gradle

RUN chmod +x ./gradlew

# 애플리케이션을 빌드합니다.
RUN ./gradlew build --stacktrace

# 빌드된 jar 파일을 복사합니다.
COPY build/libs/bookdodum-0.0.1-SNAPSHOT.jar app.jar

# 컨테이너 실행 시 실행할 명령어를 정의합니다.
CMD ["java", "-jar", "app.jar"]
