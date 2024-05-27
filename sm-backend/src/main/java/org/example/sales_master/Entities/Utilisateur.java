package org.example.sales_master.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Entity
@Data
public class Utilisateur {
    @Id
    @GeneratedValue
    private Long utilisateurID;
    private String username;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "utilisateur_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonManagedReference
    private List<Role> roles = new ArrayList<>();
    @ManyToOne
    private Produit produit;
    @OneToMany(mappedBy = "utilisateur",fetch = FetchType.LAZY)
    private List<Vente> ventes = new ArrayList<>();

    @OneToMany(mappedBy = "utilisateur")
    private List<Produit> produits = new ArrayList<>();

    @OneToMany(mappedBy = "utilisateur", fetch = FetchType.LAZY)
    private List<Client> clients;


}
