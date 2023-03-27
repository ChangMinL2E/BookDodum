# FROM gradle:7.6.1-jdk17-alpine as builder

# WORKDIR /var/jenkins_home/workspace/S08P22C104/backend/SpringFramework/bookdodum

# RUN ./gradlew clean build

# COPY build/libs/bookdodum-0.0.1-SNAPSHOT.jar bookdodum.jar

# ENTRYPOINT ["java","-jar","bookdodum.jar"]

# bookdodum-0.0.1-SNAPSHOT.jar

FROM gradle:7.6.1-jdk17-alpine as builder

WORKDIR /app

COPY . .

RUN ./gradlew clean build

FROM openjdk:17-jdk-alpine

COPY --from=builder /app/build/libs/bookdodum-0.0.1-SNAPSHOT.jar /app/bookdodum.jar

WORKDIR /app

ENTRYPOINT ["java","-jar","bookdodum.jar"]