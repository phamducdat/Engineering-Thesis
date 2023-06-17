package com.hust.datpd.engineeringthesis.entity.userclient;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "user_client_entity")
@Getter
@Setter
public class UserClientEntity {

    @EmbeddedId
    private UserClientId id;

    @Column(name = "enabled")
    private boolean enabled;
}
