package org.example.sales_master.DTO;
import java.util.Date;

public class SalesReportDto {
    private Date date;
    private Double totalSales;

    public SalesReportDto(Date date, Double totalSales) {
        this.date = date;
        this.totalSales = totalSales;
    }

    // Getters and setters
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }
}
