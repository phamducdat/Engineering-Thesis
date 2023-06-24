package com.hust.datpd.engineeringthesis;

import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmEntity;
import com.hust.datpd.engineeringthesis.repository.AccountRealmRepository;
import com.hust.datpd.engineeringthesis.repository.UserClientRepository;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakInstanceFactory;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RealmRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class StartupDataValidator {
//    private static final Logger LOGGER = LoggerFactory.getLogger(StartupDataValidator.class);
//
//    final KeycloakInstanceFactory keycloakInstanceFactory;
//
//    final AccountRealmRepository accountRealmRepository;
//
//    final UserClientRepository userClientRepository;
//
//    public StartupDataValidator(KeycloakInstanceFactory keycloakInstanceFactory,
//                                AccountRealmRepository accountRealmRepository,
//                                UserClientRepository userClientRepository) {
//        this.keycloakInstanceFactory = keycloakInstanceFactory;
//        this.accountRealmRepository = accountRealmRepository;
//        this.userClientRepository = userClientRepository;
//    }
//
//    @EventListener
//    public void onApplicationEvent(ApplicationReadyEvent event) {
//        Keycloak keycloak = keycloakInstanceFactory.getKeycloakInstance();
//
//        List<RealmRepresentation> realmRepresentations =
//                keycloak.realms().findAll();
//
//        List<AccountRealmEntity> accountRealmEntities =
//                accountRealmRepository.findAll();
//
//        LOGGER.info("Starting validate external database");
//
//        accountRealmEntities.forEach(accountRealmEntity -> {
//            if (realmRepresentations.stream().noneMatch(realmRepresentation -> {
//                return Objects.equals(realmRepresentation.getId(), accountRealmEntity.getId().getRealmId());
//            })) {
//                LOGGER.info("Delete " + accountRealmEntity.getId().getRealmId() + " in AccountRealmEntities");
//                accountRealmRepository.delete(accountRealmEntity);
//                LOGGER.info("Delete " + accountRealmEntity.getId().getRealmId() + " in UserClientEntities");
//                userClientRepository.deleteByIdRealmId(accountRealmEntity.getId().getRealmId());
//            }
//        });
//
//        LOGGER.info("Finish validate external database");
//
//
//    }


}
