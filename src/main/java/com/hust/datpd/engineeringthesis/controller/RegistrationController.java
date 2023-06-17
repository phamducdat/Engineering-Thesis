package com.hust.datpd.engineeringthesis.controller;


import com.hust.datpd.engineeringthesis.dto.RegistrationReq;
import com.hust.datpd.engineeringthesis.dto.RegistrationRes;
import com.hust.datpd.engineeringthesis.service.AccountRealmService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/registrations")
@Validated
public class RegistrationController {

    final AccountRealmService service;

    public RegistrationController(AccountRealmService service) {
        this.service = service;
    }

    @PostMapping()
    public ResponseEntity<RegistrationRes> registration(
            @Valid
            @RequestBody
            RegistrationReq from) {
        RegistrationRes to = service.registration(from);
//        RegistrationRes to = new RegistrationRes();
        return ResponseEntity.ok().body(to);
    }
}
