package com.hust.datpd.engineeringthesis.mapper;

import com.hust.datpd.engineeringthesis.dto.RegistrationReq;
import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmEntity;
import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmId;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class AccountRealmMapper {

    public AccountRealmEntity mapFromKeycloakAndRegistration(String accountId,
                                                             String realm,
                                                             RegistrationReq from) {
        AccountRealmEntity to = new AccountRealmEntity();

        AccountRealmId id = new AccountRealmId();
        id.setAccountId(accountId);
        id.setRealmId(realm);

        to.setId(id);
        to.setEmail(from.getEmail());
        to.setSystemEmail(from.getSystemEmail());
        to.setDefaultSystemPassword(from.getDefaultSystemPassword());
        to.setDefaultSystemUsernameSuffixes(from.getDefaultSystemUsernameSuffixes());
        to.setEnabled(true);
        to.setCreateDate(new Date());

        return to;
    }
}
