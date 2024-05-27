package org.example.sales_master.Controllers;
import org.example.sales_master.Entities.Utilisateur;
import org.example.sales_master.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/create")
    public Utilisateur addUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.saveUtilisateur(utilisateur);
    }

    @GetMapping("/{id}")
    public Utilisateur getUtilisateurById(@PathVariable Long id) {
        return utilisateurService.getUtilisateurById(id);
    }

    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.getAllUtilisateurs();
    }

    @PutMapping("/{id}")
    public Utilisateur updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur updatedUtilisateur) {
        return utilisateurService.updateUtilisateur(id, updatedUtilisateur);
    }

    @DeleteMapping("/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
    }
}
