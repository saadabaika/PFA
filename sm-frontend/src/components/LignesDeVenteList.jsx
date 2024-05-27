import React, { useState, useEffect } from 'react';
import { fetchLignesDeVente } from '../services/api'; // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom';
function LignesDeVenteList() {
  const [lignesDeVente, setLignesDeVente] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLignesDeVenteData = async () => {
      try {
        const response = await fetchLignesDeVente();
        console.log('Lignes de vente data:', response.data); // Inspectez les données ici
        setLignesDeVente(response.data);
      } catch (err) {
        console.error('Error fetching lignes de vente:', err);
        setError(err.message);
      }
    };

    fetchLignesDeVenteData();
  }, []);
  
  const handlePDFButtonClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/lignesdevente/${id}/pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf'
        }
      });
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank'); // Ouvrir le PDF dans une nouvelle fenêtre
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="table-container">
            
      <h2>Liste des lignes de vente</h2>
      <Link to="/createLigneDeVente" className="create-button">
        Créer une nouvelle ligne de vente
      </Link>
      <table>
        <thead>
          <tr>
            <th>Ligne de Vente ID</th>
            <th>Nom du Client</th>
           <th>Email du Client</th>
           <th>Téléphone du Client</th>

            <th>Nom du Produit</th>
            <th>Quantité</th>
            <th>Prix du Produit</th>
            <th>Statut</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {lignesDeVente.map((ligneDeVente) => {
            console.log('ligneDeVente:', ligneDeVente); // Inspectez chaque ligne de vente
            return (
              <tr key={ligneDeVente.ligneDeVenteID}>
                <td>{ligneDeVente.ligneDeVenteID}</td>
                 <td>{ligneDeVente.vente?.client?.nom || 'N/A'}</td>
                 <td>{ligneDeVente.vente?.client?.email || 'N/A'}</td>
                 <td>{ligneDeVente.vente?.client?.telephone || 'N/A'}</td>
                <td>{ligneDeVente.produit?.nom || 'N/A'}</td>
                <td>{ligneDeVente.quantite}</td>
                <td>{ligneDeVente.produit?.prix || 'N/A'}</td>
                <td>{ligneDeVente.vente?.statut|| 'N/A'}</td>
                <td>
                 <button className="buttonnn" onClick={() => handlePDFButtonClick(ligneDeVente.ligneDeVenteID)}>
                    Voir PDF
                </button>
               </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LignesDeVenteList;
