# Graduation Thesis

This project is part of the graduation thesis. This README outlines the details of installing, configuring, and running the project

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [Contact](#contact)

## Introduction

In today's digital era, ensuring the secure and efficient management of user permissions and domain access controls remains paramount. The increasing reliance on online platforms necessitates the use of comprehensive and effective access management systems. This document presents the detailed structure of a graduation thesis focusing on creating an external server for checking user permissions and domain access control. This project was accomplished by incorporating the powerful Keycloak service for Identity and Access Management (IAM).

The architecture of the proposed system integrates Keycloak, Spring Boot for backend development, and React with TypeScript for user interface (UI) creation. Keycloak, a widely recognized open-source software product, offers advanced functionalities such as user federation, identity brokering, and social login, which are leveraged in the system to manage user permissions and access.

The system is encapsulated into a single Docker container to streamline the deployment process and ensure consistent environment configurations. By using Docker Compose, various services that constitute the system, namely the server, Keycloak, and PostgreSQL database, are conveniently spun up and connected, ensuring seamless interoperability and data flow.

The server, built on Spring Boot, is configured to interact with the Keycloak service to manage user data, authenticate and authorize users, and manage realms or domains. The UI, created with React TypeScript, interacts with the server to perform the necessary operations and render the user interface.

This thesis aims to provide a comprehensive guide to creating and deploying a secure, scalable, and efficient system for checking permissions and managing domain access. Through this work, it is expected to contribute valuable insights and practical knowledge to the fields of IAM, server management, and software containerization.



## Installation

To set up the application, follow these steps:

1. Create a folder for your project.
2. Create two files inside the folder: `docker-compose.yml` and `.env`.
3. Add the following content to the `docker-compose.yml` file:
```yaml
version: '3'


services:
  server:
    image: datpd2402/external-server:latest
    container_name: external-server
    environment:
      SPRING_PROFILES_ACTIVE: postgres,docker
      KEYCLOAK_SERVER_URL: http://keycloak:8080
      KEYCLOAK_ADMIN: ${KEYCLOAK_ADMIN}
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}

      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - keycloak
    networks:
      - app-network
  postgres:
    image: postgres:13.2
    container_name: postgres
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    networks:
      - app-network
  keycloak:
    image: quay.io/keycloak/keycloak:21.1.1
    container_name: keycloak
    command: start-dev
    ports:
      - "8080:8080"
    environment:
      KEYCLOAK_ADMIN: ${KEYCLOAK_ADMIN}
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
    depends_on:
      - postgres
    networks:
      - app-network
networks:
  app-network:
```

4. Add the following content to the `.env` file:
```dotenv
#Keyloack
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin

#Postgres
POSTGRES_DB=keycloak
POSTGRES_USER=keycloak
POSTGRES_PASSWORD=keycloak
```


The following variables are used in the application:

- `SPRING_PROFILES_ACTIVE`:This is a Spring Boot environment variable used to specify which profile is active in your application. A profile is a named, logical group of settings that can be activated to configure your application for a specific environment. For this application, this variable should be set to either `postgres` or `mysql`, depending on the type of database you're using. For instance, to run the application with a PostgreSQL database, the setting would be `SPRING_PROFILES_ACTIVE=postgres,docker`.
- `KEYCLOAK_SERVER_URL`:  This is the URL where your Keycloak server is running. For this application, it should be set to `http://keycloak:8080`.
- `KEYCLOAK_ADMIN`: The username for Keycloak admin.
- `KEYCLOAK_ADMIN_PASSWORD`: The password for Keycloak admin.
- `SPRING_DATASOURCE_URL`: This is the JDBC URL for your database. For this application, if you are using PostgreSQL, it should be set to `jdbc:postgresql://postgres:5432/${POSTGRES_DB}`.
- `POSTGRES_DB`: The name of the PostgreSQL database.
- `POSTGRES_USER`: The username for PostgreSQL.
- `POSTGRES_PASSWORD`: The password for the PostgreSQL user.




Run command:
```bash
docker-compose up
```



## Running the Project



## Contact

- Email: [phamducdat2402@gmail.com](mailto:phamducdat2402@gmail.com)
- Source code: [https://github.com/phamducdat/engineering-thesis](https://github.com/phamducdat/engineering-thesis)

