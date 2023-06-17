package com.hust.datpd.engineeringthesis.validator.realm;

import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class RealmIdExistenceValidator implements ConstraintValidator<RealmIdExistence, String> {

    final KeycloakService keycloakService;

    public RealmIdExistenceValidator(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }


    @Override
    public boolean isValid(String realmId, ConstraintValidatorContext constraintValidatorContext) {
        RealmResource realmResource = keycloakService.getRealmResourceByRealmId(realmId);
        return realmResource != null;
    }
}
