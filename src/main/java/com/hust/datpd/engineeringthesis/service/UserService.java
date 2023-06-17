package com.hust.datpd.engineeringthesis.service;

import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmEntity;
import com.hust.datpd.engineeringthesis.repository.AccountRealmRepository;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService {

    final KeycloakService keycloakService;

    final AccountRealmRepository accountRealmRepository;

    public UserService(KeycloakService keycloakService, AccountRealmRepository accountRealmRepository) {
        this.keycloakService = keycloakService;
        this.accountRealmRepository = accountRealmRepository;
    }

    public List<UserRepresentation> getUsersWithoutAdminByRealmId(String realmId) {
        AccountRealmEntity entity = accountRealmRepository.findById_RealmId(realmId);
        RealmResource realmResource = keycloakService.getRealmResourceByRealmId(realmId);

        return realmResource.users().list().stream().filter(userRepresentation ->
                !Objects.equals(userRepresentation.getId(), entity.getId().getAccountId())
        ).collect(Collectors.toList());
    }
}
