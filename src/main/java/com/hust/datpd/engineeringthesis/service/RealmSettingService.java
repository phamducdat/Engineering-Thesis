package com.hust.datpd.engineeringthesis.service;

import com.hust.datpd.engineeringthesis.dto.RealmSettingDto;
import com.hust.datpd.engineeringthesis.entity.RealmSettingEntity;
import com.hust.datpd.engineeringthesis.mapper.RealmSettingMapper;
import com.hust.datpd.engineeringthesis.repository.RealmSettingRepository;
import com.hust.datpd.engineeringthesis.service.keycloak.TwoAuthenticatorOTPKeycloakService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RealmSettingService {

    final RealmSettingRepository realmSettingRepository;

    final TwoAuthenticatorOTPKeycloakService twoAuthenticatorOTPKeycloakService;
    final RealmSettingMapper mapper;

    public RealmSettingService(RealmSettingRepository realmSettingRepository, TwoAuthenticatorOTPKeycloakService twoAuthenticatorOTPKeycloakService, RealmSettingMapper mapper) {
        this.realmSettingRepository = realmSettingRepository;
        this.twoAuthenticatorOTPKeycloakService = twoAuthenticatorOTPKeycloakService;
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
            if (!entity.isRequiredTwoAuthenticationOTP() && from.isRequiredTwoAuthenticationOTP()) {
                twoAuthenticatorOTPKeycloakService.requiredTwoAuthenticatorOTP();
            } else if (entity.isRequiredTwoAuthenticationOTP() && !from.isRequiredTwoAuthenticationOTP()) {
                twoAuthenticatorOTPKeycloakService.disableTwoAuthenticatorOTP();
            }
            entity = mapper.mapFromRealmSettingDto(from, entity);
        } else {
            if (from.isRequiredTwoAuthenticationOTP()) {
                twoAuthenticatorOTPKeycloakService.requiredTwoAuthenticatorOTP();
            } else {
                twoAuthenticatorOTPKeycloakService.disableTwoAuthenticatorOTP();
            }
            entity = mapper.mapFromRealmSettingDto(from);
        }
        entity = realmSettingRepository.save(entity);

        return mapper.mapFromRealmSettingEntity(entity);
    }

    public void resetOTPConfigs() {
        twoAuthenticatorOTPKeycloakService.disableTwoAuthenticatorOTP();
        twoAuthenticatorOTPKeycloakService.requiredTwoAuthenticatorOTP();
    }
}
