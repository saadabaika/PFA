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

    @PostMapping("/create")
    public  ResponseEntity<Produit> add(@RequestBody Produit produit) {
        try {
            Produit savedProduit = produitService.saveProduit(produit);
            return new ResponseEntity<>(savedProduit, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
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
