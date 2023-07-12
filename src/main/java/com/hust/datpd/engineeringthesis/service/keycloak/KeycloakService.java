package com.hust.datpd.engineeringthesis.service.keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.KeysMetadataRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.net.URI;
import java.util.*;

@Service
public class KeycloakService {


    @Value("${keycloak.realm}")
    private String keycloakRealm;

    @Value("${keycloak.username}")
    private String keycloakUsername;

    private final KeycloakInstanceFactory keycloakInstanceFactory;


    public KeycloakService(KeycloakInstanceFactory keycloakInstanceFactory) {
        this.keycloakInstanceFactory = keycloakInstanceFactory;
    }


    public Keycloak getKeycloak() {
        return keycloakInstanceFactory.getKeycloakInstance();
    }

    public AccessTokenResponse getAdminKeycloakAccessToken(@NotNull String externalServerURL) {
        Keycloak keycloak = keycloakInstanceFactory.getKeycloakInstance();
        AccessTokenResponse to = keycloak.tokenManager().getAccessToken();
        addWebOriginToAdminCli(keycloakRealm, externalServerURL);
        return to;

    }

    public UserRepresentation getAdminAccount() {
        Keycloak keycloak = keycloakInstanceFactory.getKeycloakInstance();

        List<UserRepresentation> userRepresentations =
                keycloak.realm(keycloakRealm).users().list();

        Optional<UserRepresentation> to = userRepresentations.stream().filter(element -> {
            return Objects.equals(element.getUsername(), keycloakUsername);
        }).findFirst();

        if (to.isPresent()) {
            UserRepresentation user = to.get();
        }

        return to.orElse(null);
    }

    public String getPublicKey(String realmName) {
        try {
            Keycloak keycloak = keycloakInstanceFactory.getKeycloakInstance();
            RealmResource realmResource = keycloak.realm(realmName);

            // get realm's keys
            KeysMetadataRepresentation keys = realmResource.keys().getKeyMetadata();

            // find the active RSA key
            for (KeysMetadataRepresentation.KeyMetadataRepresentation key : keys.getKeys()) {
                if (key.getType().equals("RSA")) {
                    return key.getPublicKey();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public RealmResource getRealmResourceByRealmId(String realmId) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();
        return keycloak.realm(realmId);
    }


    public void updateClient(String realmName,
                             String id,
                             String clientId,
                             String url) {
        String formatURL = formatURL(url);

        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        ClientRepresentation clientRepresentation =
                realmResource.clients().get(id).toRepresentation();

        clientRepresentation.setClientId(clientId);

        clientRepresentation.setAdminUrl(formatURL);
        clientRepresentation.setWebOrigins(Collections.singletonList(formatURL));
        clientRepresentation.setRedirectUris(Collections.singletonList(formatURL + "/*"));
        clientRepresentation.setBaseUrl(formatURL);
        clientRepresentation.setRootUrl(formatURL);

        realmResource.clients().get(id).update(clientRepresentation);
    }

    public void createClient(String realmName,
                             String id,
                             String clientId,
                             String url) {
        String formatURL = formatURL(url);
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        ClientRepresentation clientRepresentation = new ClientRepresentation();

        clientRepresentation.setId(id);
        clientRepresentation.setClientId(clientId);

        clientRepresentation.setAdminUrl(formatURL);
        clientRepresentation.setWebOrigins(Collections.singletonList(formatURL));
        clientRepresentation.setRedirectUris(Collections.singletonList(formatURL + "/*"));
        clientRepresentation.setBaseUrl(formatURL);
        clientRepresentation.setRootUrl(formatURL);


        clientRepresentation.setAttributes(null);
        clientRepresentation.setProtocol("openid-connect");
        clientRepresentation.setEnabled(true);

        realmResource.clients().create(clientRepresentation);
    }


    public void addWebOriginToAdminCli(String realmName, String externalServerURL) {
        String externalServerURLFormatted = formatURL(externalServerURL);
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);
//        System.out.println("dat with realmResource = " + realmResource);
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


            if (webOrigins.stream().noneMatch(element -> {
                return Objects.equals(element, externalServerURLFormatted);
            })) {
                webOrigins.add(externalServerURLFormatted);
                adminCliClient.setWebOrigins(webOrigins);
                realmResource.clients().get(adminCliClient.getId()).update(adminCliClient);
            }
        }
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

    public String getIdOfClientByRealmNameAndUrl(String realmName,
                                                 String url) {
        Keycloak keycloak =
                keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource = keycloak.realm(realmName);

        List<ClientRepresentation> clientRepresentationList =
                realmResource.clients().findAll();

        for (ClientRepresentation element : clientRepresentationList) {
            if (Objects.equals(element.getRootUrl(), url))
                return element.getId();
        }

        return null;
    }

    public String formatURL(String inputURL) {
        try {
            URI uri = new URI(inputURL);
            String origin = uri.getScheme() + "://" + uri.getHost();
            if (uri.getPort() != -1) {
                origin += ":" + uri.getPort();
            }
            return origin;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error: can't convert the inputURL");
        }
        return null;
    }
}
