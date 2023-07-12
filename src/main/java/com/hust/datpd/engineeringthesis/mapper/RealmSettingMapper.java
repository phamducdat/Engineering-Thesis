package com.hust.datpd.engineeringthesis.mapper;

import com.hust.datpd.engineeringthesis.dto.RealmSettingDto;
import com.hust.datpd.engineeringthesis.entity.RealmSettingEntity;
import org.springframework.stereotype.Component;

@Component
public class RealmSettingMapper {


    public RealmSettingEntity mapFromRealmSettingDto(
            RealmSettingDto from, RealmSettingEntity to
    ) {
        to.setRequiredTwoAuthenticationOTP(from.isRequiredTwoAuthenticationOTP());
        return to;
    }

    public RealmSettingEntity mapFromRealmSettingDto(
            RealmSettingDto from
    ) {
        RealmSettingEntity to = new RealmSettingEntity();
        to.setId(0L);
        to.setRequiredTwoAuthenticationOTP(from.isRequiredTwoAuthenticationOTP());
        return to;
    }


    public RealmSettingDto mapFromRealmSettingEntity(RealmSettingEntity from) {
        RealmSettingDto to = new RealmSettingDto();
        to.setRequiredTwoAuthenticationOTP(from.isRequiredTwoAuthenticationOTP());

        return to;
    }
}
