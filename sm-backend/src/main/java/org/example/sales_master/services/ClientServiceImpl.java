package org.example.sales_master.services;

import org.example.sales_master.Entities.Client;
import org.example.sales_master.Entities.LigneDeVente;
import org.example.sales_master.Entities.Produit;
import org.example.sales_master.Entities.Vente;
import org.example.sales_master.Repositories.ClientRepository;
import org.example.sales_master.Repositories.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;


    @Override
    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
    @Override
    public List<Client> getClientsByName(String name) {
        return clientRepository.findByNomContaining(name);
    }
    @Override
    public Client getClientById(Long id) {
        Optional<Client> clientOptional = clientRepository.findById(id);
        return clientOptional.orElse(null);
    }


    @Override
    public Client updateClient(Long id, Client updatedClient) {
        Optional<Client> clientOptional = clientRepository.findById(id);
        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            client.setNom(updatedClient.getNom());
            client.setAdresse(updatedClient.getAdresse());
            client.setEmail(updatedClient.getEmail());
            client.setTelephone(updatedClient.getTelephone());
            client.setHistoriqueAchats(updatedClient.getHistoriqueAchats());
            // Si vous utilisez la relation avec Utilisateur, vous pouvez également mettre à jour l'utilisateur ici
            return clientRepository.save(client);
        } else {
            // Gérer le cas où le client n'est pas trouvé
            return null;
        }
    }
    @Override
    public boolean deleteClient(Long id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
            return true;
        }
        return false;
    }




    // Dans votre implémentation de service ClientServiceImpl
    @Override
    public List<Produit> getHistoriqueProduitsClient(Long clientId) {
        // Récupérer le client par son ID
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            List<Produit> historiqueProduits = new ArrayList<>();
            // Parcourir les ventes du client
            for (Vente vente : client.getVentes()) {
                // Parcourir les lignes de vente de chaque vente
                for (LigneDeVente ligneDeVente : vente.getLigneDeVentes()) {
                    // Ajouter le produit de chaque ligne de vente à l'historique des produits
                    historiqueProduits.add(ligneDeVente.getProduit());
                }
            }
            return historiqueProduits;
        } else {
            // Gérer le cas où le client n'est pas trouvé
            return Collections.emptyList();
        }
    }

}
