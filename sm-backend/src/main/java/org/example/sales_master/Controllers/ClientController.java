    package org.example.sales_master.Controllers;

    import org.example.sales_master.Entities.Client;
    import org.example.sales_master.Entities.Produit;
    import org.example.sales_master.Entities.Vente;
    import org.example.sales_master.services.ClientService;
    import org.example.sales_master.services.VenteService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/api/clients")
    public class ClientController {
        @Autowired
        private ClientService clientService;


        @PostMapping()
        public String add(@RequestBody Client client){
            clientService.saveClient(client);
            return "New student is added";
        }
        @GetMapping
        public ResponseEntity<List<Client>> getAllClients(@RequestParam(required = false) String name) {
            if (name != null) {
                return ResponseEntity.ok(clientService.getClientsByName(name));
            } else {
                return ResponseEntity.ok(clientService.getAllClients());
            }
        }

        @GetMapping("/{id}")
        public Client getClientById(@PathVariable Long id) {
            return clientService.getClientById(id);
        }

        @PutMapping("/{id}")
        public Client update(@PathVariable Long id, @RequestBody Client updatedClient) {
            return clientService.updateClient(id, updatedClient);
        }
        @DeleteMapping("/{id}")
        public String delete(@PathVariable Long id) {
            clientService.deleteClient(id);
            return "Client deleted successfully";
        }
        @GetMapping("/{clientId}/historique-produits")
        public ResponseEntity<List<Produit>> getHistoriqueProduitsClient(@PathVariable Long clientId) {
            List<Produit> historiqueProduitsClient = clientService.getHistoriqueProduitsClient(clientId);
            return ResponseEntity.ok(historiqueProduitsClient);
        }
    }


