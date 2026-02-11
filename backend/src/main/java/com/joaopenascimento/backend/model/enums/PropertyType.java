package com.joaopenascimento.backend.model.enums;

import lombok.Getter;

@Getter
public enum PropertyType {
    CASA("casa"),
    APARTAMENTO("apartamento");

    private String type;

    PropertyType(String type) {
        this.type = type;
    }
}
