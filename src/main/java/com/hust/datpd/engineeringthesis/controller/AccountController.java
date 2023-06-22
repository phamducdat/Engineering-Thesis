package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.AccountDto;
import com.hust.datpd.engineeringthesis.message.ErrorResponse;
import com.hust.datpd.engineeringthesis.service.AccountRealmService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/accounts")
public class AccountController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);

    final AccountRealmService accountRealmService;
    final ValidatorUtil validatorUtil;

    public AccountController(AccountRealmService accountRealmService, ValidatorUtil validatorUtil) {
        this.accountRealmService = accountRealmService;
        this.validatorUtil = validatorUtil;
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getRealmByAccountId(
            @PathVariable String username) {
        if (!validatorUtil.accountRealmExists(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ErrorResponse("Không tồn tại tài khoản, vui lòng kiểm tra lại tên tài khoản!")
            );
        }
        AccountDto to = accountRealmService.findByUsername(username);
        if (!validatorUtil.realmExists(to.getRealm())) {
            accountRealmService.deleteAccountRealmByRealmId(to.getRealm());
            LOGGER.info("Delete " + to.getRealm() + " in AccountRealmTable because Keycloak's database doesn't contain this id");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ErrorResponse("Không tồn tại tài khoản, vui lòng kiểm tra lại tên tài khoản!")
            );
        }

        return ResponseEntity.ok(to);
    }
}
