package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.KeycloakInfoDto;
import com.hust.datpd.engineeringthesis.dto.RealmDto;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/admin")
public class KeycloakController {

    final
    KeycloakService keycloakService;

    @Value("${keycloak.serverUrl}")
    private String keycloakServerUrl;

    public KeycloakController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }


    @GetMapping("/keycloak/info")
    public ResponseEntity<KeycloakInfoDto> getKeycloakInfo() {
        KeycloakInfoDto keycloakInfoDto = new KeycloakInfoDto();
        keycloakInfoDto.setKeycloakServerUrl(keycloakServerUrl);
        return ResponseEntity.ok(keycloakInfoDto);

    }

    @PostMapping("/realms")
    public ResponseEntity<?> createRealm(@RequestBody RealmDto realmDto) {
        keycloakService.createRealm(realmDto.getRealmName());
        return ResponseEntity.ok(null);

    }
}
