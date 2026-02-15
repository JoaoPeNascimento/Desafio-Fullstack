package com.joaopenascimento.backend.exception;

public record StandardError(
    Integer status,
    String error,
    String message,
    String path) {}
