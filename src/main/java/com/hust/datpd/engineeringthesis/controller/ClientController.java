package com.hust.datpd.engineeringthesis.controller;

import com.hust.datpd.engineeringthesis.dto.ClientDto;
import com.hust.datpd.engineeringthesis.message.ErrorResponse;
import com.hust.datpd.engineeringthesis.service.keycloak.KeycloakService;
import com.hust.datpd.engineeringthesis.validator.ValidatorUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.POST;

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
