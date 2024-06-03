package org.example.sales_master.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityReference;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Vente {
    @Id
    @GeneratedValue
    private Long VenteID;
    private LocalDate DateVente;
    private String Statut;
    private Double Total;


    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    private Client client;




    @OneToMany(mappedBy = "vente", fetch = FetchType.LAZY)
    @JsonIgnore
    List<LigneDeVente> ligneDeVentes = new ArrayList<>();



}
