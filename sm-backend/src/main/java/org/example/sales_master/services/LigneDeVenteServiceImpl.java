package org.example.sales_master.services;


import org.example.sales_master.Entities.Facture;
import org.example.sales_master.Entities.LigneDeVente;
import org.example.sales_master.Entities.Produit;
import org.example.sales_master.Repositories.LigneDeVenteRepository;
import org.example.sales_master.Repositories.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LigneDeVenteServiceImpl implements LigneDeVenteService {

    @Autowired
    private LigneDeVenteRepository ligneDeVenteRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Override
    public LigneDeVente saveLigneDeVente(LigneDeVente ligneDeVente) {
        if (ligneDeVente.getProduit() == null || ligneDeVente.getProduit().getProduitID() == null) {
            throw new IllegalArgumentException("Produit ID must not be null");
        }

        Long produitId = ligneDeVente.getProduit().getProduitID();
        Produit produit = produitRepository.findById(produitId)
                .orElseThrow(() -> new RuntimeException("Produit not found"));
        ligneDeVente.setMontant(ligneDeVente.getQuantite() * produit.getPrix());
        return ligneDeVenteRepository.save(ligneDeVente);
    }

    @Override
    public LigneDeVente getLigneDeVenteById(Long id) {
        return ligneDeVenteRepository.findById(id).orElse(null);
    }
    @Override
    public List<LigneDeVente> getAllLignesDeVente() {
        return ligneDeVenteRepository.findAll();
    }

    @Override
    public LigneDeVente updateLigneDeVente(Long id, LigneDeVente updatedLigneDeVente) {
        if (ligneDeVenteRepository.existsById(id)) {
            updatedLigneDeVente.setLigneDeVenteID(id);
            return ligneDeVenteRepository.save(updatedLigneDeVente);
        }
        return null;
    }

    @Override
    public void deleteLigneDeVente(Long id) {
        ligneDeVenteRepository.deleteById(id);
    }
}
