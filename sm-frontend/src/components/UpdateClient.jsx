import React, { useState } from 'react';
import { updateClient } from '../services/api';
import { useParams } from 'react-router-dom';

const UpdateClient = () => {
    const { id } = useParams();
    console.log(id);
    const [updatedClient, setUpdatedClient] = useState({
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "nom") {
            setUpdatedClient(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === "email") {
            setUpdatedClient(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === "telephone") {
            setUpdatedClient(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === "adresse") {
            setUpdatedClient(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateClient(id, updatedClient); 
            console.log(response.data)
            window.location.href = '/clients';
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="centered-form">
                <div className="form-group " >
                    <h2 className="text-center m-4">Update User</h2>

                    <label htmlFor="name">Nom :</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={updatedClient.nom}
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
                        value={updatedClient.email}
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
                        value={updatedClient.telephone}
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
                        value={updatedClient.adresse}
                        onChange={handleChange}
                        placeholder="Entrez l'adresse"
                    />
                </div>

                <button type="submit">Modifier Client</button>
            </form>
        </div>

    );
}
export default UpdateClient;
