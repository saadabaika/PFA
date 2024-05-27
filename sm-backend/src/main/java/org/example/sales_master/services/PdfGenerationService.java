package org.example.sales_master.services;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.LineSeparator;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue; // Import correct de UnitValue
import org.example.sales_master.Entities.Facture;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfGenerationService {

    public byte[] generatePdf(Facture facture) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            Image logo = new Image(ImageDataFactory.create("src/main/resources/static/images/service.jpg"))
                    .setMaxWidth(100)  // Spécifiez la largeur maximale souhaitée en points
                    .setMaxHeight(100)
                    .setHorizontalAlignment(HorizontalAlignment.LEFT); // Aligner le logo à gauche

            Paragraph header = new Paragraph()
                    .add("Facture N°: " + facture.getFactureID() + "\n")
                    .add("Date: " + facture.getDateFacturation() + "\n")

                    .setTextAlignment(TextAlignment.RIGHT)
                    .setFontSize(12);

            Table headerTable = new Table(new float[]{1, 4}); // 1:4 ratio
            headerTable.setWidth(UnitValue.createPercentValue(100)); // Définir la largeur de la table en pourcentage
            headerTable.addCell(new Cell().add(logo).setBorder(null)); // Logo à gauche
            headerTable.addCell(new Cell().add(header).setBorder(null)); // Informations d'en-tête à droite
            document.add(headerTable);

            // Ligne de séparation
            LineSeparator line = new LineSeparator(new SolidLine());
            document.add(line);

            // Informations sur la facture
            Table table = new Table(2);
            table.addCell("Client:");
           // table.addCell(facture.getLignesDeVente().getQ());
            table.addCell("Telephone:");
            //table.addCell(facture.getVente().getClient().getTelephone());
            // Ajoutez d'autres informations de la facture au besoin...

            document.add(table);

            // Informations sur la vente
            // ...

            // Informations sur le client
            // ...

            document.close();
            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
