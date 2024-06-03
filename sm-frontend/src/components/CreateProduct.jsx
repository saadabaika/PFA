import React, { useState } from 'react';
import { createProduct as createProductApi } from '../services/api';

const CreateProduct = () => {
    const [produit, setProduit] = useState({
        nom: "",
        description: "",
        prix: "",
        quantiteEnStock: "",
        imagePath: "",  // Notez le changement de "image" à "imagePath"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduit({ ...produit, [name]: value });
    };

    const handleImagePathChange = (event) => {
        const { value } = event.target;
        setProduit({ ...produit, imagePath: value });
    };

    const handleSubmitProd = async (event) => {
        event.preventDefault();
        try {
            await createProductApi(produit);
            alert('Produit créé avec succès!');
        } catch (error) {
            console.error('Erreur lors de la création du produit:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmitProd} className="centered-form">
                <div className="form-group">
                    <h2 className="text-center m-4">Enregistrer un produit</h2>
                    <label htmlFor="nom">Nom :</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={produit.nom}
                        onChange={handleChange}
                        placeholder="Entrez le nom"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description :</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={produit.description}
                        onChange={handleChange}
                        placeholder="Entrez la description"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="prix">Prix :</label>
                    <input
                        type="text"
                        id="prix"
                        name="prix"
                        value={produit.prix}
                        onChange={handleChange}
                        placeholder="Entrez le prix"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantiteEnStock">Quantité en stock :</label>
                    <input
                        type="text"
                        id="quantiteEnStock"
                        name="quantiteEnStock"
                        value={produit.quantiteEnStock}
                        onChange={handleChange}
                        placeholder="Entrez la quantité en stock"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imagePath">Chemin d'accès de l'image :</label>
                    <input
                        type="text"
                        id="imagePath"
                        name="imagePath"
                        value={produit.imagePath}
                        onChange={handleImagePathChange}
                        placeholder="Entrez le chemin de l'image"
                        required
                    />
                </div>
                <button type="submit">Créer produit</button>
            </form>
        </div>
    );
};

export default CreateProduct;
