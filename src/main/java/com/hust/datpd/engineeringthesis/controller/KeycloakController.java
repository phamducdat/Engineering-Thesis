package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.*;
import com.hust.datpd.engineeringthesis.message.ErrorResponse;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/admin/keycloak")
public class KeycloakController {

    final
    KeycloakService keycloakService;

    final ValidatorUtil validatorUtil;

    @Value("${keycloak.serverUrl}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    public KeycloakController(KeycloakService keycloakService, ValidatorUtil validatorUtil) {
        this.keycloakService = keycloakService;
        this.validatorUtil = validatorUtil;
    }


    @GetMapping("/info")
    public ResponseEntity<KeycloakInfoDto> getKeycloakInfo() {
        KeycloakInfoDto keycloakInfoDto = new KeycloakInfoDto();
        keycloakInfoDto.setKeycloakServerUrl(keycloakServerUrl);
        return ResponseEntity.ok(keycloakInfoDto);

    }

    @PostMapping("/login")
    public ResponseEntity<?> getAdminKeycloakToken(@RequestBody
                                                   AdminKeycloakDto from) {
        if (!validatorUtil.adminKeycloakValid(from.getUsername(),
                from.getPassword()))
            return ResponseEntity.status(
                    HttpStatus.UNAUTHORIZED
            ).body(
                    new ErrorResponse("Tài khoản hoặc mật khẩu không hợp lệ")
            );
        return ResponseEntity.ok(keycloakService.getAdminKeycloakAccessToken());

    }

    @PostMapping("/clients")
    public ResponseEntity<?> createClient(@RequestBody CreateClientDto from) {
        if (validatorUtil.clientExistsByClientId(realm, from.getClientId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ErrorResponse("Đã tồn tại domainId")
            );
        }
        if (validatorUtil.clientExistsByURL(realm, from.getUrl())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ErrorResponse("Đã tồn tại url")
            );
        }

        keycloakService.createClient(realm, from.getId(),
                from.getClientId(), from.getUrl());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }


    @PutMapping("/clients/{id}")
    public ResponseEntity<?> updateClient(@RequestBody UpdateClientDto from,
                                          @PathVariable String id) {
        if (validatorUtil.clientExistsByClientId(realm, id, from.getClientId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ErrorResponse("Đã tồn tại domainId")
            );
        }
        if (validatorUtil.clientExistsByURL(realm, id, from.getUrl())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ErrorResponse("Đã tồn tại url")
            );
        }

        keycloakService.updateClient(realm, id, from.getClientId(), from.getUrl());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @PostMapping("/realms")
    public ResponseEntity<?> createRealm(@RequestBody RealmDto realmDto) {
        keycloakService.createRealm(realmDto.getRealmName());
        return ResponseEntity.ok(null);

    }
}
