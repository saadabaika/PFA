package org.example.sales_master.Repositories;

import org.example.sales_master.DTO.SalesReportDto;
import org.example.sales_master.Entities.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {

    @Query("SELECT v FROM Vente v WHERE v.DateVente BETWEEN :startDate AND :endDate")
    List<Vente> findVentesByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT v.produit, SUM(v.Quantite) as totalQuantity FROM LigneDeVente v GROUP BY v.produit ORDER BY totalQuantity DESC")
    List<Object[]> findTopSellingProducts();

    @Query("SELECT v.client, COUNT(v) as purchaseCount FROM Vente v GROUP BY v.client ORDER BY purchaseCount DESC")
    List<Object[]> findTopClients();
}
