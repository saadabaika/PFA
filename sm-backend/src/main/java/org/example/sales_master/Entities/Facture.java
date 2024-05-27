package org.example.sales_master.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Data
public class Facture {
    @Id
    @GeneratedValue
    private Long FactureID;
    private Date DateFacturation;
    private Double MontantTotal;
    private String StatutPaiement;
    private String PDF;

    @Override
    public int hashCode() {
        return Objects.hash(FactureID); // Utiliser uniquement l'identifiant de la facture pour le hashcode
    }

}
