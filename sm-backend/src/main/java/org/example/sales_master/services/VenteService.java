    package org.example.sales_master.services;
    import org.example.sales_master.Entities.Vente;

    import java.util.List;

    public interface VenteService {
        Vente saveVente(Vente vente);
        Vente getVenteById(Long id);
        List<Vente> getAllVentes();
        Vente updateVente(Long id, Vente updatedVente);
        void deleteVente(Long id);
        Vente marquerEnCours(Long venteId);

        Vente marquerCompletee(Long venteId);
    }
