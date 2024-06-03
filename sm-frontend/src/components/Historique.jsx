// Historique.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClientById, fetchHistoriqueProduitsClient } from "../services/api";

const Historique = () => {
  const { id } = useParams();
  const [historiqueProduits, setHistoriqueProduits] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientData = await fetchClientById(id);
        setClient(clientData);
        
        const historiqueProduitsClient = await fetchHistoriqueProduitsClient(id);
        setHistoriqueProduits(historiqueProduitsClient);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="historique-container">
      <h1 className="historique-title">Historique des achats de {client && client.nom}</h1>
      <ul className="historique-list">
        {historiqueProduits.map((produit) => (
          <li key={produit.produitID} className="historique-item">
            <p><strong>ID du Produit:</strong> {produit.produitID}</p>
            <p><strong>Nom:</strong> {produit.nom}</p>
            <p><strong>Prix:</strong> {produit.prix} MAD</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Historique;
