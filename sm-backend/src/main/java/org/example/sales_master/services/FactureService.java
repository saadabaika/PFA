package org.example.sales_master.services;

import org.example.sales_master.Entities.Facture;

import java.util.List;

public interface FactureService {
    Facture saveFacture(Facture facture);
    Facture updateFacture(Facture facture);
    void deleteFacture(Long id);
    Facture getFactureById(Long id);

    List<Facture> getAllFactures();}