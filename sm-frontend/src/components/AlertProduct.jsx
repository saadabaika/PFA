import React, { useEffect, useState } from 'react';
import { getProduitsStockFaible } from '../services/api';

const AlertProduct = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const data = await getProduitsStockFaible();
        setProduits(data);
      } catch (error) {
        setError("Erreur lors de la récupération des produits à stock faible");
      } finally {
        setLoading(false);
      }
    };

    fetchLowStockProducts();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="alert-container">
      <h1>Produits à stock faible</h1>
      {produits.length === 0 ? (
        <p>Aucun produit à stock faible.</p>
      ) : (
        <ul>
          {produits.map((produit) => (
            <li key={produit.produitID} className="alert-item">
              <div>
                <h2>{produit.nom}</h2>
                <p className="stock-quantity">Quantité en stock: {produit.quantiteEnStock}</p>              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertProduct;
