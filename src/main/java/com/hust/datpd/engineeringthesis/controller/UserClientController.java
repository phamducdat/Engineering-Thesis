package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.ClientUserDto;
import com.hust.datpd.engineeringthesis.dto.PermissionRequestDomainId;
import com.hust.datpd.engineeringthesis.dto.PermissionRequestUrl;
import com.hust.datpd.engineeringthesis.dto.UserClientDto;
import com.hust.datpd.engineeringthesis.service.UserClientService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/admin/realms/{realmId}")
public class UserClientController {

    final UserClientService service;
    final ValidatorUtil validatorUtil;

    @Value("${keycloak.realm")
    private String realm;


    public UserClientController(UserClientService service, ValidatorUtil validatorUtil) {
        this.service = service;
        this.validatorUtil = validatorUtil;
    }

    @GetMapping("/clients/{clientId}")
    public ResponseEntity<ClientUserDto> getClientUsersByClientId(@PathVariable String clientId,
                                                                  @PathVariable String realmId) {
        return ResponseEntity.ok(service.getClientUsersByClientId(realmId, clientId));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserClientDto> getUserClientsByUserId(@PathVariable String realmId,
                                                                @PathVariable String userId) {
        return ResponseEntity.ok(service.getUserClientsByUserId(realmId, userId));
    }

//    @GetMapping("/users/{userId}/clients/{clientId}/permission")
//    public ResponseEntity<?> checkUserClient(
//            @PathVariable String clientId,
//            @PathVariable String realmId,
//            @PathVariable String userId) {
//        if (!validatorUtil.realmExists(realmId))
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Không tồn realmId"));
//        if (!validatorUtil.clientExistsByClientId(realmId, clientId))
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Không tồn clientId"));
//        if (!validatorUtil.userExists(realmId, userId))
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Không tồn tại userId"));
//
//        return ResponseEntity.ok(service.checkUserClient(realmId, clientId, userId));
//    }


    @PostMapping("/check-permission/url")
    public ResponseEntity<?> checkPermissionByUrl(@RequestBody PermissionRequestUrl from, @PathVariable String realmId) {
        boolean hasPermission = service.checkPermissionByUrl(realmId, from.getUserId(), from.getUrl());
        return ResponseEntity.ok(hasPermission);
    }


    @PostMapping("/check-permission/domain")
    public ResponseEntity<?> checkPermissionByDomainId(@RequestBody PermissionRequestDomainId from,
                                                       @PathVariable String realmId) {
        boolean hasPermission = service.checkPermissionByDomainId(realmId, from.getUserId(), from.getDomainId());
        return ResponseEntity.ok(hasPermission);
    }


    @DeleteMapping("/users/{userId}")
    public void deleteUserClient(
            @PathVariable String realmId,
            @PathVariable String userId,
            @RequestBody UserClientDto dto) {
        service.deleteUserClients(realmId, userId, dto);
    }

    @DeleteMapping("clients/{clientId}")
    public void deleteClientUsers(
            @PathVariable String clientId,
            @PathVariable String realmId,
            @RequestBody ClientUserDto dto) {
        service.deleteClientUsers(realmId, clientId, dto);

    }

    @PostMapping("/users/{userId}")
    public void createUserClients(
            @PathVariable String realmId,
            @PathVariable String userId,
            @RequestBody UserClientDto from
    ) {
        service.createUserClients(
                realmId,
                userId,
                from
        );
    }

    @PostMapping("/clients/{clientId}")
    public void createClientUsers(@PathVariable String clientId,
                                  @PathVariable String realmId,
                                  @RequestBody ClientUserDto from) {

        service.createClientUsers(
                realmId,
                clientId,
                from
        );
    }


}
