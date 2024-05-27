package org.example.sales_master.Repositories;

import org.example.sales_master.Entities.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureRepository extends JpaRepository<Facture,Long> {
}
