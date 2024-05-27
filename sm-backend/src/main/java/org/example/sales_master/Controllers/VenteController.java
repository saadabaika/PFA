package org.example.sales_master.Controllers;
import org.example.sales_master.Entities.Vente;
import org.example.sales_master.services.VenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/ventes")
public class VenteController {

    @Autowired
    private VenteService venteService;

    @PostMapping("/create")
    public Vente saveVente(@RequestBody Vente vente) {
        return venteService.saveVente(vente);
    }

    @GetMapping("/{id}")
    public Vente getVenteById(@PathVariable Long id) {
        return venteService.getVenteById(id);
    }

    @GetMapping
    public List<Vente> getAllVentes() {
        return venteService.getAllVentes();
    }

    @PutMapping("/{id}")
    public Vente updateVente(@PathVariable Long id, @RequestBody Vente updatedVente) {
        return venteService.updateVente(id, updatedVente);
    }

    @DeleteMapping("/{id}")
    public void deleteVente(@PathVariable Long id) {
        venteService.deleteVente(id);
    }

    @PutMapping("/{id}/en-cours")
    public Vente marquerVenteEnCours(@PathVariable Long id) {
        return venteService.marquerEnCours(id);
    }

    @PutMapping("/{id}/completee")
    public Vente marquerVenteCompletee(@PathVariable Long id) {
        return venteService.marquerCompletee(id);
    }
}
