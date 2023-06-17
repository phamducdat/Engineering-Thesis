# define base docker image
FROM openjdk:11

# The application's jar file
ARG JAR_FILE=target/*.jar

# Add the application's jar to the container
COPY ${JAR_FILE} app.jar

# Run the jar file with the 'docker' Spring profile
ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/app.jar"]
