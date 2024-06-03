import React, { useEffect, useState } from "react";
import { deleteproduct, fetchProducts } from "../services/api";
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0); // Ajout de l'état pour le nombre de produits

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts();
                console.log(response.data);
                setProducts(response.data);
                setProductCount(response.data.length); // Mettre à jour le nombre de produits
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Utilisation d'un tableau vide pour exécuter l'effet uniquement lors du montage initial

    const handleDeleteproduct = async (id) => {
        try {
            await deleteproduct(id);
            window.location.href = '/produits';
        } catch (error) {
            console.error('Error deleting produit:', error);
        }
    };

    return (
        <div className="Clients">
            <div className="button-container">  
                <Link to="/CreateProduct" className="create-client-button">Add Product</Link>
            </div>
            <div className="card-container">
                {products.map((product) => (
                    <div key={product.produitID} className="client-card">
                        <h2>{product.nom}</h2>
                        <img src={`http://localhost:8080${product.image}`} alt={product.nom} />
                        <p><strong>Prix:</strong> {product.prix}</p>
                        <p><strong>quantiteEnStock:</strong> {product.quantiteEnStock}</p>
                        <div className="button-div">  
                            <a onClick={() => handleDeleteproduct(product.produitID)} className="custom-button">Delete</a>
                            <Link to={`/products/${product.produitID}`} className="custom-button">Update</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
