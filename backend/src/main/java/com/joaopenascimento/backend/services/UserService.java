package com.joaopenascimento.backend.services;

import com.joaopenascimento.backend.dto.auth.RegisterDTO;
import com.joaopenascimento.backend.dto.property.PropertyDTO;
import com.joaopenascimento.backend.dto.user.UserCreateDTO;
import com.joaopenascimento.backend.dto.user.UserDTO;
import com.joaopenascimento.backend.dto.user.UserUpdateDTO;
import com.joaopenascimento.backend.model.User;
import com.joaopenascimento.backend.model.enums.UserRole;
import com.joaopenascimento.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        User user =  userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO create(UserCreateDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Este email já está em uso.");
        }

        User user = new User();
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setRole(dto.role());
        user.setPassword(passwordEncoder.encode(dto.password()));

        user = userRepository.save(user);
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO update(Long id, UserUpdateDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (dto.name() != null) {
            user.setName(dto.name());
        }

        if(dto.email() != null) {
            if (!user.getEmail().equals(dto.email()) && userRepository.existsByEmail(dto.email())) {
                throw new RuntimeException("Email já cadastrado");
            }
            user.setEmail(dto.email());
        }

        if(dto.password() != null) {
            user.setPassword(passwordEncoder.encode(dto.password()));
        }

        if (dto.role() != null) {
            user.setRole(dto.role());
        }

        user = userRepository.save(user);
        return new UserDTO(user);
    }

    @Transactional
    public List<PropertyDTO> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("usuário não encontrado"));

        return user.getFavorites().stream()
                .map(PropertyDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void register(RegisterDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Este email já está em uso");
        }

        User user = new User();
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setRole(UserRole.CLIENTE);

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
    }
}
