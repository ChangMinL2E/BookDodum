# 사용할 base 이미지를 정의합니다.
FROM openjdk:11.0.11-jdk-slim-buster

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# Gradle 빌드 스크립트 파일을 복사합니다.
COPY build.gradle .
COPY gradlew .

# Gradle 의존성을 복사합니다.
COPY gradle gradle

# 의존성 다운로드를 실행합니다.
RUN ./gradlew downloadDependencies

# 소스 코드를 복사합니다.
COPY . .

# 애플리케이션을 빌드합니다.
RUN ./gradlew build

# 빌드된 jar 파일을 복사합니다.
COPY build/libs/*.jar app.jar

# 컨테이너 실행 시 실행할 명령어를 정의합니다.
CMD ["java", "-jar", "app.jar"]