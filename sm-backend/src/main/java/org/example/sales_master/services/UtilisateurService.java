package org.example.sales_master.services;

import org.example.sales_master.Entities.Utilisateur;

import java.util.List;

public interface UtilisateurService {
    Utilisateur saveUtilisateur(Utilisateur utilisateur);

    Utilisateur getUtilisateurById(Long id);

    List<Utilisateur> getAllUtilisateurs();

    Utilisateur updateUtilisateur(Long id, Utilisateur updatedUtilisateur);

    void deleteUtilisateur(Long id);
}
