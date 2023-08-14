package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.ClientUserDto;
import com.hust.datpd.engineeringthesis.dto.PermissionRequestDomainId;
import com.hust.datpd.engineeringthesis.dto.PermissionRequestUrl;
import com.hust.datpd.engineeringthesis.dto.UserClientDto;
import com.hust.datpd.engineeringthesis.entity.userclient.UserClientEntity;
import com.hust.datpd.engineeringthesis.message.ErrorResponse;
import com.hust.datpd.engineeringthesis.service.UserClientService;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/admin/realms/{realmId}")
public class UserClientController {

    final UserClientService service;

    final KeycloakService keycloakService;
    final ValidatorUtil validatorUtil;

    @Value("${keycloak.realm")
    private String realm;


    public UserClientController(UserClientService service, KeycloakService keycloakService, ValidatorUtil validatorUtil) {
        this.service = service;
        this.keycloakService = keycloakService;
        this.validatorUtil = validatorUtil;
    }

    @GetMapping("/clients/{clientId}")
    public ResponseEntity<?> getClientUsersByClientId(@PathVariable String clientId,
                                                      @PathVariable String realmId,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        return ResponseEntity.ok(service.getClientUsersByClientId(realmId, clientId));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserClientsByUserId(@PathVariable String realmId,
                                                    @PathVariable String userId,
                                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        return ResponseEntity.ok(service.getUserClientsByUserId(realmId, userId));
    }


    @PostMapping("/check-permission/url")
    public ResponseEntity<?> checkPermissionByUrl(@RequestBody PermissionRequestUrl from,
                                                  @PathVariable String realmId
//                                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        Optional<UserClientEntity> entity = service.checkUserClientEntityByURL(realmId, from.getUserId(), from.getUrl());
        if (entity.isPresent()) {
            return ResponseEntity.ok(true);
        } else {
            UserRepresentation adminAccount = keycloakService.getAdminAccount();
            if (Objects.equals(adminAccount.getId(), from.getUserId()))
                return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }


    @PostMapping("/check-permission/domain")
    public ResponseEntity<?> checkPermissionByDomainId(@RequestBody PermissionRequestDomainId from,
                                                       @PathVariable String realmId
//                                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {

        Optional<UserClientEntity> entity = service.checkUserClientEntityByDomainId(realmId, from.getUserId(), from.getDomainId());
        if (entity.isPresent()) {
            return ResponseEntity.ok(true);
        } else {
            UserRepresentation adminAccount = keycloakService.getAdminAccount();
            if (Objects.equals(adminAccount.getId(), from.getUserId()))
                return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }


    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUserClient(
            @PathVariable String realmId,
            @PathVariable String userId,
            @RequestBody UserClientDto dto,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        service.deleteUserClients(realmId, userId, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("clients/{clientId}")
    public ResponseEntity<?> deleteClientUsers(
            @PathVariable String clientId,
            @PathVariable String realmId,
            @RequestBody ClientUserDto dto,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        service.deleteClientUsers(realmId, clientId, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/users/{userId}")
    public ResponseEntity<?> createUserClients(
            @PathVariable String realmId,
            @PathVariable String userId,
            @RequestBody UserClientDto from,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        service.createUserClients(
                realmId,
                userId,
                from
        );
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/users/{userId}/all")
    public ResponseEntity<?> deleteUserClientsByUserId(
            @PathVariable String realmId,
            @PathVariable String userId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        service.deleteUserClientsByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/clients/{clientId}")
    public ResponseEntity<?> createClientUsers(@PathVariable String clientId,
                                               @PathVariable String realmId,
                                               @RequestBody ClientUserDto from,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );

        service.createClientUsers(
                realmId,
                clientId,
                from
        );
        return ResponseEntity.status(HttpStatus.OK).build();

    }

    @DeleteMapping("/clients/{clientId}/all")
    public ResponseEntity<?> deleteUserClientsByClientId(
            @PathVariable String realmId,
            @PathVariable String clientId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        service.deleteClientUsersByClientId(clientId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
