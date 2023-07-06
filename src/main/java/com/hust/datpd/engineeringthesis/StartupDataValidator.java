package com.hust.datpd.engineeringthesis;

import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.net.UnknownHostException;

@Component
public class StartupDataValidator {
    private static final Logger LOGGER = LoggerFactory.getLogger(StartupDataValidator.class);


    @Value("${keycloak.realm}")
    private String keycloakRealm;

    final KeycloakService keycloakService;

    public StartupDataValidator(KeycloakService keycloakService) {

        this.keycloakService = keycloakService;
    }

    @EventListener
    public void onApplicationEvent(ApplicationReadyEvent event) throws UnknownHostException {
        LOGGER.info("Add app URL if they do not exist in the master realm");
        keycloakService.addWebOriginToAdminCli(keycloakRealm);
    }


}
