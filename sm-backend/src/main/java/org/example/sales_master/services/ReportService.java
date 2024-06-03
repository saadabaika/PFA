package org.example.sales_master.services;

import org.example.sales_master.Entities.Vente;
import org.example.sales_master.Repositories.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class ReportService {
    @Autowired
    private VenteRepository venteRepository;

    public List<Vente> getSalesReport(LocalDate startDate, LocalDate endDate) {
        return venteRepository.findVentesByDateRange(startDate, endDate);
    }

    public List<Object[]> getTopSellingProducts() {
        return venteRepository.findTopSellingProducts();
    }

    public List<Object[]> getTopClients() {
        return venteRepository.findTopClients();
    }
}
