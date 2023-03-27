FROM openjdk:17-jdk-alpine

WORKDIR /var/jenkins_home/workspace/S08P22C104/backend/SpringFramework/bookdodum

COPY build/libs/bookdodum-0.0.1-SNAPSHOT.jar community-service.jar

ENTRYPOINT ["java","-jar","community-service.jar"]

# bookdodum-0.0.1-SNAPSHOT.jar