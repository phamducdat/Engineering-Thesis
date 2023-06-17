package com.hust.datpd.engineeringthesis.service;

import com.hust.datpd.engineeringthesis.dto.AccountDto;
import com.hust.datpd.engineeringthesis.dto.RegistrationReq;
import com.hust.datpd.engineeringthesis.dto.RegistrationRes;
import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmEntity;
import com.hust.datpd.engineeringthesis.mapper.AccountRealmMapper;
import com.hust.datpd.engineeringthesis.repository.AccountRealmRepository;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountRealmService {

    final KeycloakService keycloakService;
    final AccountRealmRepository repository;

    final AccountRealmMapper mapper;

    public AccountRealmService(KeycloakService keycloakService,
                               AccountRealmRepository repository, AccountRealmMapper mapper) {
        this.keycloakService = keycloakService;
        this.repository = repository;
        this.mapper = mapper;
    }

    public AccountDto findByUsername(String username) {
        AccountRealmEntity entity =
                repository.findByEmail(username);

        AccountDto to = new AccountDto();
        to.setAccountId(entity.getId().getAccountId());
        to.setRealm(entity.getId().getRealmId());
        to.setEnabled(entity.isEnabled());

        return to;
    }

    public RegistrationRes registration(RegistrationReq from) {
        String userName = from.getEmail();
        String realm = UUID.randomUUID().toString();
        keycloakService.createRealm(realm);

        String userId = keycloakService.createUser(realm,
                from.getEmail(),
                userName,
                from.getFirstName(),
                from.getLastName(),
                from.getPassword());

        keycloakService.grantRealmAdminPermission(realm, userId);

        AccountRealmEntity entity = mapper.mapFromKeycloakAndRegistration(
                userId,
                realm,
                from);

        repository.save(entity);

        RegistrationRes to = new RegistrationRes();
        to.setRealm(realm);
        return to;
    }
}
