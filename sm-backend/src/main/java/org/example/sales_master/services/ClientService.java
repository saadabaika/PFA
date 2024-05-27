package org.example.sales_master.services;

import org.example.sales_master.Entities.Client;

import java.util.List;

public interface ClientService {
    public Client saveClient(Client client);
    public List<Client> getAllClients();
    Client getClientById(Long id);
    public List<Client> getClientsByName(String name);
    public Client updateClient(Long id, Client updatedClient);
    public  boolean deleteClient(Long id);

}
