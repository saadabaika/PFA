package org.example.sales_master.services;

import org.example.sales_master.Entities.Produit;

import java.util.List;

public interface ProduitService {
    Produit saveProduit(Produit produit);
    List<Produit> getAllProduits();
    Produit getProduitById(Long id);
    Produit updateProduit(Long id, Produit updatedProduit);
    void deleteProduit(Long id);
    List<Produit> getProduitsStockFaible();
}

