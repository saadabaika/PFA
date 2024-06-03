import React, { useEffect, useState } from "react";
import { deleteClient, fetchClients } from "../services/api";
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchClients(filterName);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterName]);

  const handleFilterChange = event => {
    setFilterName(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      window.location.href = '/clients';
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className="Clients">
      <h1 className="profile-title"></h1>
      <div className="button-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={handleFilterChange}
            className="search-bar"
          />
          <i className="fa fa-search search-icon"></i>
        </div>
        <Link to="/CreateClient" className="create-client-button">Add User</Link>
      </div>
      <div className="card-container">
        {clients.map((client) => (
          <div key={client.clientID} className="client-card">
            <Link to={`/clients/${client.clientID}/historique`} className="client-link">
              <h2>{client.nom}</h2>
              <p><strong>Adresse:</strong> {client.adresse}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Téléphone:</strong> {client.telephone}</p>
            </Link>
            <div className="button-div">
              <a onClick={() => handleDelete(client.clientID)} className="custom-button">Delete</a>
              <Link to={`/clients/${client.clientID}`} className="custom-button">Update</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
