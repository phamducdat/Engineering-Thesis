package com.hust.datpd.engineeringthesis.entity.accountrealm;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class AccountRealmId implements Serializable {

    @Column(name = "realm_id")
    private String realmId;

    @Column(name = "account_id")
    private String accountId;

    @Override
    public int hashCode() {
        return Objects.hash(realmId, accountId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        AccountRealmId other = (AccountRealmId) obj;
        return Objects.equals(realmId, other.realmId) &&
                Objects.equals(accountId, other.accountId);
    }
}
