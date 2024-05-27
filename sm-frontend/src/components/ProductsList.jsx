import React, { useEffect, useState } from "react";
import { deleteproduct, fetchProducts } from "../services/api";
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts();
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
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
            <h1 className="profile-title">Products</h1>
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
                      <a  onClick={() => handleDeleteproduct(product.produitID)} className="custom-button">Delete</a>
                        <Link to={`/products/${product.produitID}`} className="custom-button">Update</Link>
                        </div>

                    </div>
                    
                ))}
            </div>
        </div>


    );
}
export default ProductList;