# define base docker image
FROM openjdk:11

# The application's jar file
ARG JAR_FILE=target/*.jar

# Add the application's jar to the container
COPY ${JAR_FILE} app.jar

# Copy the start-app.sh into the Docker image
COPY ./start-app.sh /app/start-app.sh

# Give execute permission to the script
# Install necessary tools
RUN apt-get update && apt-get install -y ca-certificates

RUN chmod +x /app/start-app.sh

# Set the entrypoint to run the shell script
ENTRYPOINT ["/app/start-app.sh"]
