package com.hust.datpd.engineeringthesis.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "realm_setting_entity")
@Setter
@Getter
public class RealmSettingEntity {

    @Id
    private String realmId;

    @Column(name = "default_password")
    private String defaultPassword;

}
