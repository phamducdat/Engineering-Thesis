package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.message.ErrorResponse;
import com.hust.datpd.engineeringthesis.service.UserService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import com.hust.datpd.engineeringthesis.validator.realm.RealmIdExistence;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/admin/realms/{realmId}/users")
public class UserController {

    final UserService userService;

    final ValidatorUtil validatorUtil;

    public UserController(UserService userService, ValidatorUtil validatorUtil) {
        this.userService = userService;
        this.validatorUtil = validatorUtil;
    }

    @GetMapping()
    public ResponseEntity<?> getUsersWithoutAdminByRealmId(@RealmIdExistence @PathVariable String realmId) {
//        if (!validatorUtil.realmExists(realmId))
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Không tồn realmId"));
        return ResponseEntity.ok(userService.getUsersWithoutAdminByRealmId(realmId));
    }
}
