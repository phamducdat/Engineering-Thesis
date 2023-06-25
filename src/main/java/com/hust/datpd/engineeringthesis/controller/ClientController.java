package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/external/v1/clients")
@Validated
public class ClientController {


    final KeycloakService keycloakService;

    final ValidatorUtil validatorUtil;



    public ClientController(KeycloakService keycloakService, ValidatorUtil validatorUtil) {
        this.keycloakService = keycloakService;
        this.validatorUtil = validatorUtil;
    }



}
