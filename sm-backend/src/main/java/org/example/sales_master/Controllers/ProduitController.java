package org.example.sales_master.Controllers;

import org.example.sales_master.Entities.Produit;
import org.example.sales_master.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/produits")

public class ProduitController {
    @Autowired
    private ProduitService produitService;
    private static final String UPLOAD_DIR = "/path/to/your/upload/directory/";

    @PostMapping("/create")
    public ResponseEntity<String> add(
            @RequestParam("nom") String nom,
            @RequestParam("description") String description,
            @RequestParam("prix") Double prix,
            @RequestParam("quantiteEnStock") String quantiteEnStockStr,
            @RequestParam("image") MultipartFile image) {

        try {
            int quantiteEnStock = Integer.parseInt(quantiteEnStockStr); // Convertir la chaîne en entier

            // Créer l'objet Produit avec les données reçues
            Produit produit = new Produit();
            produit.setNom(nom);
            produit.setDescription(description);
            produit.setPrix(prix);
            produit.setQuantiteEnStock(quantiteEnStock);
            // Gérer le fichier image ici si nécessaire

            // Enregistrer le produit dans la base de données
            produitService.saveProduit(produit);

            return ResponseEntity.status(HttpStatus.CREATED).body("Produit créé avec succès!");
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La quantité en stock doit être un nombre entier valide.");
        }
    }
    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }

    @GetMapping("/{id}")
    public Produit getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id);
    }

    @PutMapping("/{id}")
    public Produit update(@PathVariable Long id, @RequestBody Produit updatedProduit) {
        return produitService.updateProduit(id, updatedProduit);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return "Product deleted successfully";
    }
    @GetMapping("/stock-faible")
    public List<Produit> getProduitsStockFaible() {
        return produitService.getProduitsStockFaible();
    }
}
