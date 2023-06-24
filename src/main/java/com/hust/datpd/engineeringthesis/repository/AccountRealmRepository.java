package com.hust.datpd.engineeringthesis.repository;

import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmEntity;
import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRealmRepository extends JpaRepository<AccountRealmEntity, AccountRealmId> {


    AccountRealmEntity findById_RealmId(String realmId);
    AccountRealmEntity findByEmail(String userName);

    void deleteByIdRealmId(String realmId);
}
