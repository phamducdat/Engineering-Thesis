package com.hust.datpd.engineeringthesis.dto;

import com.hust.datpd.engineeringthesis.validator.email.UniqueEmail;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class RegistrationReq {
    @NotNull(message = "Email là bắt buộc")
    @Email(message = "Vui lòng nhập đúng định dạng email")
    @UniqueEmail
    private String email;

    @NotNull(message = "Mật khẩu là bắt buộc")
    @Size(min = 6, max = 20, message = "Mật khẩu từ 6 đến 20 ký tự")
    private String password;

    @Nullable
    private String firstName;
    @Nullable
    private String lastName;

    private String systemEmail;
    private String defaultSystemPassword;
        private String defaultSystemUsernameSuffixes;
}
