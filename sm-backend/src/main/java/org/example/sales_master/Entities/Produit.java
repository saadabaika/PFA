package org.example.sales_master.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Produit {
    @Id
    @GeneratedValue
    private Long ProduitID;
    private String nom;
    private String Description;
    private Double Prix;
    private int QuantiteEnStock;
    private String Image;
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL , orphanRemoval = true)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonBackReference
    private Set<LigneDeVente> ligneDeVente = new HashSet<>();





}
