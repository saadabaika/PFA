package org.example.sales_master.services;

import org.example.sales_master.Entities.Utilisateur;
import org.example.sales_master.Repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public Utilisateur saveUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id).orElse(null);
    }

    @Override
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @Override
    public Utilisateur updateUtilisateur(Long id, Utilisateur updatedUtilisateur) {
        if (utilisateurRepository.existsById(id)) {
            updatedUtilisateur.setUtilisateurID(id);
            return utilisateurRepository.save(updatedUtilisateur);
        }
        return null;
    }

    @Override
    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }
}
