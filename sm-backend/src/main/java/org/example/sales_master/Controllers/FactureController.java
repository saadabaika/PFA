package org.example.sales_master.Controllers;

import org.example.sales_master.Entities.Facture;
import org.example.sales_master.services.FactureService;
import org.example.sales_master.services.PdfGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/factures")
public class FactureController {

    @Autowired
    private FactureService factureService;

    @PostMapping
    public ResponseEntity<Facture> createFacture(@RequestBody Facture facture) {
        Facture savedFacture = factureService.saveFacture(facture);
        return ResponseEntity.ok(savedFacture);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facture> updateFacture(@PathVariable Long id, @RequestBody Facture facture) {
        facture.setFactureID(id);
        Facture updatedFacture = factureService.updateFacture(facture);
        return ResponseEntity.ok(updatedFacture);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facture> getFactureById(@PathVariable Long id) {
        Facture facture = factureService.getFactureById(id);
        return ResponseEntity.ok(facture);
    }

    @GetMapping
    public ResponseEntity<List<Facture>> getAllFactures() {
        List<Facture> factures = factureService.getAllFactures();
        return ResponseEntity.ok(factures);
    }
    @Autowired
    private PdfGenerationService pdfGenerationService;

    // Vos autres méthodes de contrôleur...

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generatePdfForFacture(@PathVariable Long id) {
        Facture facture = factureService.getFactureById(id);
        byte[] pdfBytes = pdfGenerationService.generatePdf(facture);
        // Renvoyer le PDF en tant que réponse HTTP
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
