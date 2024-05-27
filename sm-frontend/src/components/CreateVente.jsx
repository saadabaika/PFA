import React, { useState, useEffect } from 'react';
import { createVente, fetchClients } from '../services/api';

function CreateVente() {
  const [dateVente, setDateVente] = useState('');
  const [statut, setStatut] = useState('');
  const [total, setTotal] = useState('');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const response = await fetchClients(); // Récupérez la liste des clients depuis votre API
        setClients(response.data);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
        setError('Failed to fetch clients');
      }
    };

    fetchClientsData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const venteData = { dateVente, statut, total, clientId };
      console.log('Vente Data to be sent:', venteData); // Log the data before sending
      const newVente = await createVente(venteData); // Envoyez la requête POST pour créer la vente
      console.log('Vente créée avec succès:', newVente);
      // Redirection vers une autre page ou affichage d'un message de succès
    } catch (err) {
      console.error('Erreur lors de la création de la vente:', err);
      setError('Erreur lors de la création de la vente');
    }
  };

  return (
    <div className="new-vente-form">
      <h2>Créer une vente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date de vente:</label>
          <input type="date" value={dateVente} onChange={(e) => setDateVente(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Statut:</label>
          <input type="text" value={statut} onChange={(e) => setStatut(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Total:</label>
          <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Client:</label>
          <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
            <option value="">Sélectionner un client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.nom}</option>
            ))}
          </select>
        </div>
        <button type="submit">Créer</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default CreateVente;
