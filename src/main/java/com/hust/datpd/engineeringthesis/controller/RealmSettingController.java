package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.RealmSettingDto;
import com.hust.datpd.engineeringthesis.message.ErrorResponse;
import com.hust.datpd.engineeringthesis.service.RealmSettingService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/admin/realms/{realmId}/settings")
public class RealmSettingController {

    final RealmSettingService service;
    final ValidatorUtil validatorUtil;

    public RealmSettingController(RealmSettingService service, ValidatorUtil validatorUtil) {
        this.service = service;
        this.validatorUtil = validatorUtil;
    }

    @GetMapping()
    public ResponseEntity<?> getRealmSetting(@PathVariable String realmId,
                                             @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        return ResponseEntity.ok(service.getRealmSettingDto());
    }

    @PutMapping()
    public ResponseEntity<?> updateRealmSetting(@PathVariable String realmId,
                                                @RequestBody RealmSettingDto from,
                                                @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader

    ) {
        if (!validatorUtil.validAdminToken(authHeader))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Tài khoản không hợp lệ")
            );
        return ResponseEntity.ok(service.updateRealmSetting(from));

    }
}
