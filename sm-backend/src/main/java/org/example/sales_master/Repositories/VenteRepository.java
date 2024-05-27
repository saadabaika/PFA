package org.example.sales_master.Repositories;

import org.example.sales_master.DTO.SalesReportDto;
import org.example.sales_master.Entities.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {
}
