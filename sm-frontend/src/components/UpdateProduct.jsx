import React, { useState } from 'react';
import { updateProduct } from '../services/api';
import { useParams } from 'react-router-dom';

const UpdateClient = () => {
    const { id } = useParams();
    console.log(id);
    const [updatedProduct, setUpdatedProduct] = useState({
        nom: '',
        prix: '',
        description: '',
        quantiteEnStock: '',
        image: '',

    });
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "nom") {
            setUpdatedProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === "prix") {
            setUpdatedProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === "description") {
            setUpdatedProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === "quantiteEnStock") {
            setUpdatedProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateProduct(id, updatedProduct); 
            console.log(response.data)
            window.location.href = '/products';
        } catch (error) {
            console.error('Error updating product:', error);
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
                        value={updatedProduct.nom}
                        onChange={handleChange}
                        placeholder="Entrez le nom"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="prix">Prix :</label>
                    <input
                        type="text"
                        id="prix"
                        name="prix"
                        value={updatedProduct.prix}
                        onChange={handleChange}
                        placeholder="Entrez le prix"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telephone">Description :</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={updatedProduct.description}
                        onChange={handleChange}
                        placeholder="Entrez la description"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="adresse">Quantité :</label>
                    <input
                        type="number"
                        id="quantiteEnStock"
                        name="quantiteEnStock"
                        value={updatedProduct.quantiteEnStock}
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
