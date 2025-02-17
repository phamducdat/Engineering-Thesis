package com.hust.datpd.engineeringthesis.repository;

import com.hust.datpd.engineeringthesis.entity.userclient.UserClientEntity;
import com.hust.datpd.engineeringthesis.entity.userclient.UserClientId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserClientRepository extends JpaRepository<UserClientEntity, UserClientId> {

    List<UserClientEntity> findByIdRealmIdAndIdUserId(String realmId, String userId);

    List<UserClientEntity> findByIdRealmIdAndIdClientId(String realmId, String clientId);

    void deleteByIdRealmId(String realmId);

    void deleteById_UserId(String userId);

    void deleteById_ClientId(String clientId);

    Optional<UserClientEntity> findById(UserClientId id);

}
