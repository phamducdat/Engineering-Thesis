package com.hust.datpd.engineeringthesis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDto {

    private String accountId;
    private String realm;
    private boolean enabled;
}
