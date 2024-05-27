package org.example.sales_master.services;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.example.sales_master.Entities.LigneDeVente;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;

@Service
public class PdfGenerationLigneService {

    public byte[] generatePdf(LigneDeVente ligneDeVente) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            Image logo = new Image(ImageDataFactory.create("src/main/resources/static/images/service.jpg"))
                    .setMaxWidth(100)
                    .setMaxHeight(100)
                    .setHorizontalAlignment(HorizontalAlignment.LEFT);

            // Formatter la date
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String formattedDate = dateFormat.format(ligneDeVente.getVente().getDateVente());

            // Informations sur la facture
            Paragraph header = new Paragraph()
                    .add("Facture N°: " + ligneDeVente.getLigneDeVenteID() + "\n")
                    .add("Date: " + formattedDate + "\n")
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setFontSize(12);

            Table headerTable = new Table(new float[]{1, 4});
            headerTable.setWidth(UnitValue.createPercentValue(100));
            headerTable.addCell(new Cell().add(logo).setBorder(null));
            headerTable.addCell(new Cell().add(header).setBorder(null));
            document.add(headerTable);

            document.add(new Paragraph("\n")); // Ajoute un espace

            // Ligne de séparation
            LineSeparator line = new LineSeparator(new SolidLine());
            document.add(line);

            document.add(new Paragraph("\n")); // Ajoute un espace

            // Informations sur le client
            Table clientTable = new Table(2);
            clientTable.addCell("Client:");
            clientTable.addCell(ligneDeVente.getVente().getClient().getNom());
            clientTable.addCell("Telephone:");
            clientTable.addCell(ligneDeVente.getVente().getClient().getTelephone());
            clientTable.addCell("Email:");
            clientTable.addCell(ligneDeVente.getVente().getClient().getEmail());
            document.add(clientTable);

            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace

            // Informations sur le produit
            Table productTable = new Table(new float[]{1, 1, 1, 1, 1});
            productTable.setWidth(UnitValue.createPercentValue(100));
            productTable.addHeaderCell(new Cell().add(new Paragraph("Nom").setBold()));
            productTable.addHeaderCell(new Cell().add(new Paragraph("Description").setBold()));
            productTable.addHeaderCell(new Cell().add(new Paragraph("Prix Unitaire").setBold()));
            productTable.addHeaderCell(new Cell().add(new Paragraph("Quantité").setBold()));
            productTable.addHeaderCell(new Cell().add(new Paragraph("Montant").setBold()));

            productTable.addCell(ligneDeVente.getProduit().getNom());
            productTable.addCell(ligneDeVente.getProduit().getDescription());
            productTable.addCell(String.format("%.0f DH", ligneDeVente.getProduit().getPrix()));
            productTable.addCell(String.valueOf(ligneDeVente.getQuantite()));
            productTable.addCell(String.format("%.0f DH", ligneDeVente.getMontant()));

            document.add(productTable);

            // Calculer la TVA
            double tvaRate = 0.20;
            double montantTotal = ligneDeVente.getMontant();
            double montantTVA = montantTotal * tvaRate;

            // Ajouter le tableau de la TVA
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace

            // Créer le tableau pour la TVA et le montant total
            Table tvaTable = new Table(new float[]{1, 1});
            tvaTable.setWidth(UnitValue.createPercentValue(50)); // Ajuster la largeur du tableau
            tvaTable.setHorizontalAlignment(HorizontalAlignment.RIGHT); // Aligner le tableau à droite
            tvaTable.addCell(new Cell().add(new Paragraph("Montant HT").setBold()));
            tvaTable.addCell(new Cell().add(new Paragraph(String.format("%.2f DH", montantTotal))).setTextAlignment(TextAlignment.RIGHT));
            tvaTable.addCell(new Cell().add(new Paragraph("TVA (20%)").setBold()));
            tvaTable.addCell(new Cell().add(new Paragraph(String.format("%.2f DH", montantTVA))).setTextAlignment(TextAlignment.RIGHT));
            tvaTable.addCell(new Cell().add(new Paragraph("Montant Total").setBold()));
            tvaTable.addCell(new Cell().add(new Paragraph(String.format("%.2f DH", montantTotal + montantTVA))).setTextAlignment(TextAlignment.RIGHT));

            document.add(tvaTable);
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace
            document.add(new Paragraph("\n")); // Ajoute un espace


            // Ajout des informations en bas de la facture
            document.add(line);
            Paragraph footer = new Paragraph()

                    .add(new LineSeparator(new SolidLine()).setMarginBottom(5))

                    .add("R.C : 5123769 - Patente : 485215478 - I.F : 40557276\n")
                    .add("C.N.S.S :  – ICE : 00001237480980077\n")
                    .add("105 Rue Al Bakri, Casablanca 20250    \n")
                    .add("E-mail : Saadabaikaa@gmail.com")
                    .setTextAlignment(TextAlignment.CENTER);

            document.add(footer);

            document.close();
            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
