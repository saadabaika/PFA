package org.example.sales_master.Repositories;

import org.example.sales_master.Entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByUsername(String username);
    Boolean existsByUsername(String username);}
