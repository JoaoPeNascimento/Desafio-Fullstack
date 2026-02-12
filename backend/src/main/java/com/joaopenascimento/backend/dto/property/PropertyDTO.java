package com.joaopenascimento.backend.dto.property;

import com.joaopenascimento.backend.model.Property;
import com.joaopenascimento.backend.model.enums.PropertyType;

public record PropertyDTO(
        Long id,
        String name,
        String description,
        PropertyType type,
        Double value,
        Integer bedrooms,
        String address,
        String city,
        String state,
        Long brokerId,
        String brokerName
) {
    public PropertyDTO(Property entity) {
        this(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getType(),
                entity.getValue(),
                entity.getBedrooms(),
                entity.getAddress(),
                entity.getCity(),
                entity.getState(),
                entity.getBroker().getId(),
                entity.getBroker().getName()
        );
    }
}