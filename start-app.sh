#!/bin/bash

# Import the certificate into the system's trust store
cp /var/ssl/rootCA.crt /usr/local/share/ca-certificates/
update-ca-certificates

# The rest of your script
keytool -import -v -trustcacerts -alias myRootCA -file /var/ssl/rootCA.crt -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit -noprompt
java -Dspring.profiles.active=docker -jar /app.jar
