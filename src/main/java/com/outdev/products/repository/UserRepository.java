package com.outdev.products.repository;

import java.util.Optional;

import com.outdev.products.domain.User;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository {
    Optional<User> findByEmail(String email);
}
