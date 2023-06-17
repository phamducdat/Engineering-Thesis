package com.hust.datpd.engineeringthesis.service.keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KeycloakInstanceFactory {
    @Value("${keycloak.serverUrl}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String keycloakRealm;

    @Value("${keycloak.clientId}")
    private String keycloakClientId;

    @Value("${keycloak.username}")
    private String keycloakUserName;

    @Value("${keycloak.password}")
    private String keycloakPassword;

    public Keycloak getKeycloakInstance() {
        return KeycloakBuilder.builder()
                .serverUrl(keycloakServerUrl)
                .realm(keycloakRealm)
                .clientId(keycloakClientId)
                .username(keycloakUserName)
                .password(keycloakPassword)
                .build();
    }

}
