package com.hust.datpd.engineeringthesis.service.keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TwoAuthenticatorOTPKeycloakService {

    @Value("${keycloak.realm}")
    private String keycloakRealm;

    @Value("${keycloak.username}")
    private String keycloakUsername;
    private final KeycloakInstanceFactory keycloakInstanceFactory;

    public TwoAuthenticatorOTPKeycloakService(KeycloakInstanceFactory keycloakInstanceFactory) {
        this.keycloakInstanceFactory = keycloakInstanceFactory;
    }

    public void requiredTwoAuthenticatorOTP() {
        Keycloak keycloak = keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource =
                keycloak.realm(keycloakRealm);

        List<UserRepresentation> users = realmResource.users().list();
        for (UserRepresentation user : users) {

            if (!Objects.equals(user.getUsername(), keycloakUsername)) {
                UserResource userResource = realmResource.users().get(user.getId());

                List<String> requiredActions = user.getRequiredActions();
                if (!requiredActions.contains("CONFIGURE_TOTP")) {
                    requiredActions.add("CONFIGURE_TOTP");
                    user.setRequiredActions(requiredActions);
                    userResource.update(user);
                }
            }
        }
    }

    public void disableTwoAuthenticatorOTP() {
        Keycloak keycloak = keycloakInstanceFactory.getKeycloakInstance();

        RealmResource realmResource =
                keycloak.realm(keycloakRealm);

        List<UserRepresentation> users = realmResource.users().list();
        for (UserRepresentation user : users) {
            // Get specific user resource
            UserResource userResource = realmResource.users().get(user.getId());

            // Remove CONFIGURE_OTP from required actions if it is there
            List<String> requiredActions = user.getRequiredActions();
            if (requiredActions.contains("CONFIGURE_TOTP")) {
                requiredActions.remove("CONFIGURE_TOTP");
                user.setRequiredActions(requiredActions);

                // Update the user
                userResource.update(user);
            }

            // Remove OTP credentials
            List<CredentialRepresentation> credentials = userResource.credentials();
            for (CredentialRepresentation credential : credentials) {
                if (credential.getType().equals("otp")) {
                    userResource.removeCredential(credential.getId());
                }
            }
        }
    }

}
