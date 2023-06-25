package com.hust.datpd.engineeringthesis.validator;

import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmEntity;
import com.hust.datpd.engineeringthesis.repository.AccountRealmRepository;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakInstanceFactory;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@Component
public class ValidatorUtil {


    @Value("${keycloak.username}")
    private String keycloakUsername;

    @Value("${keycloak.password}")
    private String keycloakPassword;
    private final KeycloakInstanceFactory keycloakInstanceFactory;

    final AccountRealmRepository accountRealmRepository;

    public ValidatorUtil(KeycloakInstanceFactory keycloakInstanceFactory, AccountRealmRepository accountRealmRepository) {
        this.keycloakInstanceFactory = keycloakInstanceFactory;
        this.accountRealmRepository = accountRealmRepository;
    }


    public boolean adminKeycloakValid(String username,
                                      String password) {
        return Objects.equals(username, keycloakUsername) &&
                Objects.equals(password, keycloakPassword);
    }

    public boolean realmExists(String realmName) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realmName);
        try {
            RealmRepresentation realmRepresentation = realmResource.toRepresentation();
            return realmRepresentation != null;
        } catch (NotFoundException ex) {
            return false;
        }
    }

    public boolean clientExistsByClientId(String realmName, String clientId) {

        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realmName);

        List<ClientRepresentation> clientRepresentations =
                realmResource.clients().findByClientId(clientId);

        return clientRepresentations.size() > 0;

    }

    public Boolean clientExistsByURL(String realmName, String url) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realmName);

        List<ClientRepresentation> clientRepresentationList = realmResource.clients().findAll();

        return clientRepresentationList.stream().anyMatch(element -> {
            return Objects.equals(element.getRootUrl(), url);
        });
    }

    public boolean userExists(String realmName, String userId) {

        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(realmName);

        try {
            UserRepresentation userRepresentation = realmResource.users().get(userId).toRepresentation();
            return userRepresentation != null;
        } catch (NotFoundException ex) {
            return false;
        }
    }

    public boolean accountRealmExists(String accountName) {
        AccountRealmEntity entity =
                accountRealmRepository.findByEmail(accountName);
        return entity != null;
    }
}
