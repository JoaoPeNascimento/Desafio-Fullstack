package com.joaopenascimento.backend.repositories;

import com.joaopenascimento.backend.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
