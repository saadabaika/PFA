package org.example.sales_master.Repositories;

import org.example.sales_master.Entities.LigneDeVente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LigneDeVenteRepository extends JpaRepository<LigneDeVente, Long> {
}