# Stage 1: Build the application
FROM maven:3.8.6 AS build

# Install OpenJDK 17
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Set the working directory
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean install -DskipTests

# Stage 2: Create the runtime image
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/myapp.jar

# Expose the port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "myapp.jar"]
