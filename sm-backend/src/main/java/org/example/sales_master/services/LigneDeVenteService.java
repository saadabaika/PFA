package org.example.sales_master.services;

import org.example.sales_master.Entities.LigneDeVente;

import java.util.List;

public interface LigneDeVenteService {
    LigneDeVente saveLigneDeVente(LigneDeVente ligneDeVente);

    LigneDeVente getLigneDeVenteById(Long id);
    List<LigneDeVente> getAllLignesDeVente();

    LigneDeVente updateLigneDeVente(Long id, LigneDeVente updatedLigneDeVente);

    void deleteLigneDeVente(Long id);
}
