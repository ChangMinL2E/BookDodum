FROM openjdk:17-jdk-alpine

WORKDIR /var/jenkins_home/workspace/S08P22C104/backend/SpringFramework/bookdodum

RUN ./gradlew clean build

COPY build/libs/bookdodum-0.0.1-SNAPSHOT.jar bookdodum.jar

ENTRYPOINT ["java","-jar","bookdodum.jar"]

# bookdodum-0.0.1-SNAPSHOT.jar