package org.example.sales_master.services;

import org.example.sales_master.Entities.Produit;
import org.example.sales_master.Repositories.ProduitRepository;
import org.example.sales_master.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitServiceImpl implements ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Override
    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @Override
    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).orElse(null);
    }
    @Override
    public Produit updateProduit(Long id, Produit updatedProduit) {
        if (produitRepository.existsById(id)) {
            updatedProduit.setProduitID(id);
            return produitRepository.save(updatedProduit);
        }
        return null;
    }

    @Override
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }

    private static final int seuilStockBas = 10;


    public List<Produit> getProduitsStockFaible() {
        return produitRepository.findByQuantiteEnStockLessThan(seuilStockBas);
    }
}