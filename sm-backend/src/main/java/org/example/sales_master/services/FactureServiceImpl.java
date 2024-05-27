package org.example.sales_master.services;


import org.example.sales_master.Entities.Facture;
import org.example.sales_master.Repositories.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FactureServiceImpl implements FactureService {

    @Autowired
    private FactureRepository factureRepository;

    @Override
    public Facture saveFacture(Facture facture) {
        return factureRepository.save(facture);
    }

    @Override
    public Facture updateFacture(Facture facture) {
        Optional<Facture> existingFacture = factureRepository.findById(facture.getFactureID());
        if (existingFacture.isPresent()) {
            return factureRepository.save(facture);
        } else {
            throw new RuntimeException("Facture not found with id " + facture.getFactureID());
        }
    }

    @Override
    public void deleteFacture(Long id) {
        factureRepository.deleteById(id);
    }

    @Override
    public Facture getFactureById(Long id) {
        return factureRepository.findById(id).orElseThrow(() -> new RuntimeException("Facture not found with id " + id));
    }

    @Override
    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }
}
