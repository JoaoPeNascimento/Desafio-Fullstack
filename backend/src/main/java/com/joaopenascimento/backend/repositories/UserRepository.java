package com.joaopenascimento.backend.repositories;

import com.joaopenascimento.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
