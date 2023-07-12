package com.hust.datpd.engineeringthesis.service;

import com.hust.datpd.engineeringthesis.dto.RealmSettingDto;
import com.hust.datpd.engineeringthesis.entity.RealmSettingEntity;
import com.hust.datpd.engineeringthesis.mapper.RealmSettingMapper;
import com.hust.datpd.engineeringthesis.repository.RealmSettingRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RealmSettingService {

    final RealmSettingRepository realmSettingRepository;
    final RealmSettingMapper mapper;

    public RealmSettingService(RealmSettingRepository realmSettingRepository, RealmSettingMapper mapper) {
        this.realmSettingRepository = realmSettingRepository;
        this.mapper = mapper;
    }

    public RealmSettingDto getRealmSettingDto() {
        Optional<RealmSettingEntity> optionalRealmSettingEntity =
                realmSettingRepository.findById(0L);
        RealmSettingEntity entity;
        if (optionalRealmSettingEntity.isPresent()) {
            entity = optionalRealmSettingEntity.get();
        } else {
            entity = new RealmSettingEntity();
            entity.setId(0L);
            entity.setRequiredTwoAuthenticationOTP(false);
        }
        return mapper.mapFromRealmSettingEntity(entity);
    }

    public RealmSettingDto updateRealmSetting(RealmSettingDto from) {
        Optional<RealmSettingEntity> optionalRealmSettingEntity =
                realmSettingRepository.findById(0L);
        RealmSettingEntity entity;
        if (optionalRealmSettingEntity.isPresent()) {
            entity = optionalRealmSettingEntity.get();
            entity = mapper.mapFromRealmSettingDto(from, entity);
        } else {
            entity = mapper.mapFromRealmSettingDto(from);
        }
        entity = realmSettingRepository.save(entity);

        return mapper.mapFromRealmSettingEntity(entity);
    }
}
