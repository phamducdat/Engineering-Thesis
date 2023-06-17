package com.hust.datpd.engineeringthesis.repository;

import com.hust.datpd.engineeringthesis.entity.RealmSettingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealmSettingRepository extends JpaRepository<RealmSettingEntity, String> {

}
