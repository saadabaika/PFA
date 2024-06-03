package org.example.sales_master.Controllers;

import org.example.sales_master.Entities.Vente;
import org.example.sales_master.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/sales")
    public List<Vente> getSalesReport(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                      @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return reportService.getSalesReport(startDate, endDate);
    }

    @GetMapping("/top-products")
    public List<Object[]> getTopSellingProducts() {
        return reportService.getTopSellingProducts();
    }

    @GetMapping("/top-clients")
    public List<Object[]> getTopClients() {
        return reportService.getTopClients();
    }

}
