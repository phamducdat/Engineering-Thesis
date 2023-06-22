package com.hust.datpd.engineeringthesis.service;

import com.hust.datpd.engineeringthesis.dto.ClientUserDto;
import com.hust.datpd.engineeringthesis.dto.UserClientDto;
import com.hust.datpd.engineeringthesis.entity.userclient.UserClientEntity;
import com.hust.datpd.engineeringthesis.entity.userclient.UserClientId;
import com.hust.datpd.engineeringthesis.mapper.UserClientMapper;
import com.hust.datpd.engineeringthesis.repository.UserClientRepository;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserClientService {

    final
    UserClientRepository repository;

    final KeycloakService keycloakService;

    final UserClientMapper mapper;

    public UserClientService(UserClientRepository repository, KeycloakService keycloakService, UserClientMapper mapper) {
        this.repository = repository;
        this.keycloakService = keycloakService;
        this.mapper = mapper;
    }


    public ClientUserDto getClientUsersByClientId(
            String realmId,
            String clientId
    ) {
        return mapper.mapFromListEntitiesToClientUserDto(
                repository.findByIdRealmIdAndIdClientId(realmId, clientId)
        );
    }

    @Transactional
    public void deleteAllUserClientsByRealmId(String realmId) {
        repository.deleteByIdRealmId(realmId);
    }

    public UserClientDto getUserClientsByUserId(
            String realmId,
            String userId) {

        return mapper.mapFromListEntitiesToUserClientDto(repository.findByIdRealmIdAndIdUserId(realmId, userId));
    }

    public List<UserClientEntity> getUserClientsByClientId(
            String realmId,
            String clientId
    ) {
        return repository.findByIdRealmIdAndIdClientId(realmId, clientId);
    }

    public boolean checkUserClient(String realmId, String clientId, String userId) {
        UserClientId id = new UserClientId();

        id.setRealmId(realmId);
        id.setClientId(keycloakService.getIdOfClientByRealmNameAndClientId(realmId, clientId));
        id.setUserId(userId);

        return repository.findById(id).isPresent();
    }


    public void createUserClients(
            String realmId,
            String userId,
            UserClientDto from) {
        List<UserClientEntity> to = mapper.mapFromUserClientDTO(
                realmId,
                userId,
                from);
        repository.saveAll(to);
    }

    public void createClientUsers(
            String realmId,
            String clientId,
            ClientUserDto from
    ) {
        List<UserClientEntity> to = mapper.mapFromClientUserDTO(realmId,
                clientId,
                from);
        repository.saveAll(to);
    }

    public void deleteUserClients(String realmId, String userId, UserClientDto dto) {
        List<UserClientEntity> to = mapper.mapFromUserClientDTO(
                realmId,
                userId,
                dto
        );
        repository.deleteAll(to);
    }

    public void deleteClientUsers(String realmId,
                                  String clientId,
                                  ClientUserDto dto) {
        List<UserClientEntity> to = mapper.mapFromClientUserDTO(realmId, clientId, dto);
        repository.deleteAll(to);
    }

}
