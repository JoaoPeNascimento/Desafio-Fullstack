package com.joaopenascimento.backend.dto.user;

import com.joaopenascimento.backend.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserUpdateDTO(
        @Size(min = 3, max = 100) String name,
        @Email String email,
        @Size(min = 6) String password,
        UserRole role
        ) {}
