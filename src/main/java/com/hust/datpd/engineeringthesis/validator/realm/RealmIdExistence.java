package com.hust.datpd.engineeringthesis.validator.realm;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = RealmIdExistenceValidator.class)
public @interface RealmIdExistence {

    String message() default "Không tồn tại realmId";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
