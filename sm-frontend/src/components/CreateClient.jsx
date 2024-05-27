import React, { useState } from 'react';
import { createClient } from '../services/api';

const CreateClient = () => {
  const [client, setClient] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "nom") {
      setClient({ ...client, [name]: value });
    } else if (name === "email") {
      setClient({ ...client, [name]: value });
    } else if (name === "telephone") {
      setClient({ ...client, [name]: value });
    } else if (name === "adresse") {
      setClient({ ...client, [name]: value });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createClient(client); // Call the createClient function from api.js
      alert('Client created successfully!');
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="centered-form">
        <div className="form-group " >
          <h2 className="text-center m-4">Register User</h2>

          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={client.nom}
            onChange={handleChange}
            placeholder="Entrez le nom"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Entrez l'email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telephone">Téléphone :</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={client.telephone}
            onChange={handleChange}
            placeholder="Entrez le téléphone"
          />
        </div>

        <div className="form-group">
          <label htmlFor="adresse">Adresse :</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={client.adresse}
            onChange={handleChange}
            placeholder="Entrez l'adresse"
          />
        </div>

        <button type="submit">Créer Client</button>
      </form>
    </div>

  );
};
export default CreateClient;
