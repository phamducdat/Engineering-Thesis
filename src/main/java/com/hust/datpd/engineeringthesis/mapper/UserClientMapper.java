package com.hust.datpd.engineeringthesis.mapper;

import com.hust.datpd.engineeringthesis.dto.ClientUserDto;
import com.hust.datpd.engineeringthesis.dto.UserClientDto;
import com.hust.datpd.engineeringthesis.entity.userclient.UserClientEntity;
import com.hust.datpd.engineeringthesis.entity.userclient.UserClientId;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserClientMapper {
    final KeycloakService keycloakService;

    public UserClientMapper(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    public List<UserClientEntity> mapFromUserClientDTO(
            String realmId,
            String userId,
            UserClientDto from) {
        List<UserClientEntity> to = new ArrayList<>();
        from.getClientIds().forEach(element -> {
            UserClientEntity entity = new UserClientEntity();
            UserClientId userClientId = new UserClientId();

            userClientId.setRealmId(realmId);
            userClientId.setUserId(userId);
            userClientId.setClientId(element);
            entity.setId(userClientId);
            entity.setEnabled(true);

            to.add(entity);
        });
        return to;
    }

    public List<UserClientEntity> mapFromClientUserDTO(
            String realmId,
            String clientId,
            ClientUserDto from
    ) {
        List<UserClientEntity> to = new ArrayList<>();
        from.getUserIds().forEach(element -> {
            UserClientEntity entity = new UserClientEntity();
            UserClientId userClientId = new UserClientId();

            userClientId.setRealmId(realmId);
            userClientId.setUserId(element);
            userClientId.setClientId(clientId);
            entity.setId(userClientId);
            entity.setEnabled(true);

            to.add(entity);
        });
        return to;
    }

    public UserClientDto mapFromListEntitiesToUserClientDto(List<UserClientEntity> from) {
        ArrayList<String> clientIds = new ArrayList<>();

        from.forEach(element -> {
            clientIds.add(element.getId().getClientId());
        });

        UserClientDto to = new UserClientDto();

        to.setClientIds(clientIds);

        return to;
    }


    public ClientUserDto mapFromListEntitiesToClientUserDto(List<UserClientEntity> from) {
        ArrayList<String> userIds = new ArrayList<>();

        from.forEach(element -> {
            userIds.add(element.getId().getUserId());
        });

        ClientUserDto to = new ClientUserDto();

        to.setUserIds(userIds);

        return to;

    }

}
