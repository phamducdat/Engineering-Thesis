package com.hust.datpd.engineeringthesis.entity.accountrealm;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "account_realm_entity")
@Getter
@Setter
public class AccountRealmEntity {

    @EmbeddedId
    private AccountRealmId id;

    @Column
    private String email;

    @Column
    private String systemEmail;

    @Column
    private String defaultSystemPassword;

    @Column
    private String defaultSystemUsernameSuffixes;

    @Column
    private Date createDate;

    @Column
    private boolean enabled;
}
