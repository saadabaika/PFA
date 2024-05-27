package org.example.sales_master.Repositories;

import org.example.sales_master.Entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    @Query("SELECT p FROM Produit p WHERE p.QuantiteEnStock < :seuilStockBas")
    List<Produit> findByQuantiteEnStockLessThan(@Param("seuilStockBas") int seuilStockBas);

}
