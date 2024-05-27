package org.example.sales_master.services;

import org.example.sales_master.Entities.Vente;
import org.example.sales_master.Repositories.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenteServiceImpl implements VenteService {

    @Autowired
    private VenteRepository venteRepository;

    @Override
    public Vente saveVente(Vente vente) {
        return venteRepository.save(vente);
    }

    @Override
    public Vente getVenteById(Long id) {
        return venteRepository.findById(id).orElse(null);
    }

    @Override
    public List<Vente> getAllVentes() {
        return venteRepository.findAll();
    }

    @Override
    public Vente updateVente(Long id, Vente updatedVente) {
        if (venteRepository.existsById(id)) {
            updatedVente.setVenteID(id);
            return venteRepository.save(updatedVente);
        }
        return null;
    }

    @Override
    public void deleteVente(Long id) {
        venteRepository.deleteById(id);
    }
    @Override
    public Vente marquerEnCours(Long venteId) {
        Vente vente = venteRepository.findById(venteId).orElse(null);
        if (vente != null) {
            vente.setStatut("En cours");
            return venteRepository.save(vente);
        }
        return null;
    }

    @Override
    public Vente marquerCompletee(Long venteId) {
        Vente vente = venteRepository.findById(venteId).orElse(null);
        if (vente != null) {
            vente.setStatut("Complétée");
            return venteRepository.save(vente);
        }
        return null ; }
}
