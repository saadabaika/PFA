package org.example.sales_master.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Data
public class LigneDeVente {
    @Id
    @GeneratedValue
    private Long LigneDeVenteID;
    private int Quantite;
    private Double PrixUnitaire;
    private Double Montant;
    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "vente_id")
    private Vente vente;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "produit_id")
    private Produit produit;


    @Override
    public int hashCode() {
        return Objects.hash(LigneDeVenteID); // Utiliser uniquement l'identifiant de la ligne de vente pour le hashcode
    }
}
