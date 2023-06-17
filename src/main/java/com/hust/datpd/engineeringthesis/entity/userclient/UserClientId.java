package com.hust.datpd.engineeringthesis.entity.userclient;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class UserClientId implements Serializable {

    @Column(name = "realm_id")
    private String realmId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "client_id")
    private String clientId;

    @Override
    public int hashCode() {
        return Objects.hash(realmId, userId, clientId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        UserClientId other = (UserClientId) obj;
        return Objects.equals(realmId, other.realmId) &&
                Objects.equals(userId, other.userId) &&
                Objects.equals(clientId, other.clientId);
    }

}
