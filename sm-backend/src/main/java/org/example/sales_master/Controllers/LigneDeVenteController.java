package org.example.sales_master.Controllers;

import org.example.sales_master.Entities.Facture;
import org.example.sales_master.Entities.LigneDeVente;
import org.example.sales_master.services.LigneDeVenteService;
import org.example.sales_master.services.PdfGenerationLigneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/lignesdevente")
public class LigneDeVenteController {

    @Autowired
    private LigneDeVenteService ligneDeVenteService;
    @Autowired
    private PdfGenerationLigneService pdfGenerationService;

    @PostMapping("/create")
    public LigneDeVente createLigneDeVente(@RequestBody LigneDeVente ligneDeVente) {
        return ligneDeVenteService.saveLigneDeVente(ligneDeVente);
    }
    @GetMapping("/all")
    public List<LigneDeVente> getAllLignesDeVente() {
        return ligneDeVenteService.getAllLignesDeVente();
    }


    @GetMapping("/{id}")
    public LigneDeVente getLigneDeVenteById(@PathVariable Long id) {
        return ligneDeVenteService.getLigneDeVenteById(id);
    }

    @PutMapping("/{id}")
    public LigneDeVente updateLigneDeVente(@PathVariable Long id, @RequestBody LigneDeVente updatedLigneDeVente) {
        return ligneDeVenteService.updateLigneDeVente(id, updatedLigneDeVente);
    }

    @DeleteMapping("/{id}")
    public void deleteLigneDeVente(@PathVariable Long id) {
        ligneDeVenteService.deleteLigneDeVente(id);
    }



    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generatePdfForLigneDeVente(@PathVariable Long id) {
        LigneDeVente ligneDeVente = ligneDeVenteService.getLigneDeVenteById(id);
        if (ligneDeVente != null) {
            byte[] pdfBytes = pdfGenerationService.generatePdf(ligneDeVente);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "ligne_de_vente_" + id + ".pdf");
            headers.setContentLength(pdfBytes.length);
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

