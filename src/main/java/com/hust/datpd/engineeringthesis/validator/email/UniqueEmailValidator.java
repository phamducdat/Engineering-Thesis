package com.hust.datpd.engineeringthesis.validator.email;

import com.hust.datpd.engineeringthesis.entity.accountrealm.AccountRealmEntity;
import com.hust.datpd.engineeringthesis.repository.AccountRealmRepository;
import com.hust.datpd.engineeringthesis.validator.email.UniqueEmail;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.NotNull;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    final AccountRealmRepository repository;

    public UniqueEmailValidator(AccountRealmRepository repository) {
        this.repository = repository;
    }

    @Override
    public boolean isValid(@NotNull String email, ConstraintValidatorContext constraintValidatorContext) {
        AccountRealmEntity entity = repository.findByEmail(email);
        return entity == null;
    }
}
