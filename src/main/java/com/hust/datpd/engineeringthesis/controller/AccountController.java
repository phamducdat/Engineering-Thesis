package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.AccountDto;
import com.hust.datpd.engineeringthesis.service.AccountRealmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/accounts")
public class AccountController {

    final AccountRealmService accountRealmService;

    public AccountController(AccountRealmService accountRealmService) {
        this.accountRealmService = accountRealmService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<AccountDto> getRealmByAccountId(
            @PathVariable String username) {
        AccountDto to = accountRealmService.findByUsername(username);


        return ResponseEntity.ok(to);
    }
}
