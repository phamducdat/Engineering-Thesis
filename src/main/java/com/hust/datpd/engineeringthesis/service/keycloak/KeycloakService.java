package com.hust.datpd.engineeringthesis.service.keycloak;

import com.hust.datpd.engineeringthesis.StartupDataValidator;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.core.Response;
import java.util.*;

@Service
public class KeycloakService {

    @Value("${frontendUrl}")
    private String frontendUrl;
    private final ServerProperties serverProperties;

    private final KeycloakInstanceFactory keycloakInstanceFactory;

    private static final Logger LOGGER = LoggerFactory.getLogger(StartupDataValidator.class);


    public KeycloakService(ServerProperties serverProperties, KeycloakInstanceFactory keycloakInstanceFactory) {
        this.serverProperties = serverProperties;
        this.keycloakInstanceFactory = keycloakInstanceFactory;
    }


    public Keycloak getKeycloak() {
        return keycloakInstanceFactory.getKeycloakInstance();
    }

    public AccessTokenResponse getAdminKeycloakAccessToken() {
        Keycloak keycloak = keycloakInstanceFactory.getKeycloakInstance();
        return keycloak.tokenManager().getAccessToken();
    }

    public RealmResource getRealmResourceByRealmId(String realmId) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();
        return keycloak.realm(realmId);
    }

    public void createRealm(String realmName) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmRepresentation realmRepresentation =
                new RealmRepresentation();
        realmRepresentation.setId(realmName);
        realmRepresentation.setRealm(realmName);
        realmRepresentation.setEnabled(true);

        try {
            keycloak.realms().create(realmRepresentation);
            addWebOriginToAdminCli(realmName);
        } catch (ClientErrorException e) {
            Response response = e.getResponse();
            String errorMessage = response.readEntity(String.class);
            LOGGER.error("Failed to create realm. Error message: " + errorMessage);
            throw e;
        }
    }

    public void updateClient(String realmName,
                             String id,
                             String clientId,
                             String url) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        ClientRepresentation clientRepresentation =
                realmResource.clients().get(id).toRepresentation();

        clientRepresentation.setClientId(clientId);

        clientRepresentation.setAdminUrl(url);
        clientRepresentation.setWebOrigins(Collections.singletonList(url));
        clientRepresentation.setRedirectUris(Collections.singletonList(url));
        clientRepresentation.setBaseUrl(url);
        clientRepresentation.setRootUrl(url);

        realmResource.clients().get(id).update(clientRepresentation);
    }

    public void createClient(String realmName,
                             String id,
                             String clientId,
                             String url) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        ClientRepresentation clientRepresentation = new ClientRepresentation();

        clientRepresentation.setId(id);
        clientRepresentation.setClientId(clientId);

        clientRepresentation.setAdminUrl(url);
        clientRepresentation.setWebOrigins(Collections.singletonList(url));
        clientRepresentation.setRedirectUris(Collections.singletonList(url));
        clientRepresentation.setBaseUrl(url);
        clientRepresentation.setRootUrl(url);


        clientRepresentation.setAttributes(null);
        clientRepresentation.setProtocol("openid-connect");
        clientRepresentation.setEnabled(true);

        realmResource.clients().create(clientRepresentation);
    }


    public void addWebOriginToAdminCli(String realmName) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        List<ClientRepresentation> clients = realmResource.clients().findAll();

        // Find the "admin-cli" client
        Optional<ClientRepresentation> adminCliClientOptional = clients.stream()
                .filter(client -> "admin-cli".equals(client.getClientId()))
                .findFirst();

        if (adminCliClientOptional.isPresent()) {
            ClientRepresentation adminCliClient = adminCliClientOptional.get();

            // Get the current WebOrigins or create a new list
            List<String> webOrigins = adminCliClient.getWebOrigins() != null ?
                    adminCliClient.getWebOrigins() : new ArrayList<>();

            String address;
            if (serverProperties.getAddress() != null) {
                address = String.valueOf(serverProperties.getAddress());
            } else {
                address = "http://localhost";
            }
            int port = serverProperties.getPort();
            String url = address + ":" + port;
            // Add the new WebOrigin


            if (frontendUrl != null && webOrigins.stream().noneMatch(element -> {
                return Objects.equals(element, frontendUrl);
            })) {
                LOGGER.info("Add frontendURL like web origin in master realm");
                webOrigins.add(frontendUrl);
            }

            if (webOrigins.stream().noneMatch(element -> {
                return Objects.equals(url, element);
            })) {
                LOGGER.info("Add backendURL like web origin in master realm");
                webOrigins.add(url);
            }

            // Update the WebOrigins
            adminCliClient.setWebOrigins(webOrigins);

            // Update the client in Keycloak
            realmResource.clients().get(adminCliClient.getId()).update(adminCliClient);
        }
    }

    public String createUser(String realmName,
                             String userName,
                             String email,
                             String firstName,
                             String lastName,
                             String password) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        UserRepresentation userRepresentation =
                new UserRepresentation();

        userRepresentation.setUsername(userName);
        userRepresentation.setEmail(email);
        userRepresentation.setFirstName(firstName);
        userRepresentation.setLastName(lastName);
        userRepresentation.setEnabled(true);

        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(password);

        userRepresentation.setCredentials(Arrays.asList(passwordCred));
        Response response = keycloak.realm(realmName).users().create(userRepresentation);
        if (response.getStatus() == 201) {
            return CreatedResponseUtil.getCreatedId(response);
        }
        return null;
    }

    public void grantRealmAdminPermission(String realmName, String userId) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        UserResource userResource =
                realmResource.users().get(userId);

        ClientRepresentation clientRepresentation = realmResource
                .clients()
                .findByClientId("realm-management").get(0);

        RoleRepresentation roleRepresentation = realmResource
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get("realm-admin").toRepresentation();

        userResource.roles().clientLevel(clientRepresentation.getId()).add(Collections.singletonList(roleRepresentation));
    }

    public String getIdOfClientByRealmNameAndClientId(@NotNull String realmName,
                                                      @NotNull String clientId) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        ClientRepresentation clientRepresentation =
                realmResource.clients().findByClientId(clientId).get(0);

        if (clientRepresentation != null)
            return clientRepresentation.getId();
        else return null;

    }
}
