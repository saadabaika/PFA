package org.example.sales_master.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Client {
    @Id
    @GeneratedValue
    private Long ClientID;
    private String nom;
    private String Adresse;
    private String Email;
    private String Telephone;
    private String HistoriqueAchats;
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Vente> ventes = new ArrayList<>();

}
