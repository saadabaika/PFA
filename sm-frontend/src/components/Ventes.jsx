import React, { useState, useEffect } from 'react';
import { fetchVentes } from '../services/api';
import { Link } from 'react-router-dom';

function VentesList() {
  const [ventes, setVentes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVentes();
        console.log('API response:', response);
        
        // Vérifiez si response.data est un tableau
        if (Array.isArray(response.data)) {
          setVentes(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Failed to fetch ventes:', err);
        setError('Failed to fetch ventes');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ventes-list">
      <h2>Liste des Ventes</h2>
      <Link to="/createVente" className="create-button">
        Créer une nouvelle vente
      </Link>
      <table>
        <thead>
          <tr>
          <th>ID</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Total</th>
            <th>Client</th>
            <th>Email</th>
            <th>Téléphone</th>


          </tr>
        </thead>
        <tbody>
          {ventes.map((vente) => (
             <tr key={vente.venteID}>
             <td>{vente.venteID}</td>
             <td>{new Date(vente.dateVente).toLocaleDateString()}</td>
             <td>{vente.statut}</td>
             <td>{vente.total}</td>
             <td>{vente.client.nom}</td>
             <td>{vente.client.email}</td>
             <td>{vente.client.telephone}</td>


           </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VentesList;
