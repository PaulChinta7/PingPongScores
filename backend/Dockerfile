# Use the official OpenJDK image from the Docker Hub
FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/backend-0.0.1-SNAPSHOT.jar /app/myapp.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "myapp.jar"]
