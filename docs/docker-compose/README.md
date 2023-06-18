# Graduation Thesis

This project is part of the graduation thesis. This README outlines the details of installing, configuring, and running the project

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Project](#running-the-project)
5. [Contact](#contact)

## Introduction


## Prerequisites


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

      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/keycloak
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


The following environment variables are used in the application:

- `KEYCLOAK_ADMIN`: The username for Keycloak admin.
- `KEYCLOAK_ADMIN_PASSWORD`: The password for Keycloak admin.

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

