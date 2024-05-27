import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchVentes, createLigneDeVente } from '../services/api';


function CreateLigneDeVente() {
  const [products, setProducts] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedVente, setSelectedVente] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixUnitaire, setPrixUnitaire] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetchProducts();
        setProducts(productsResponse.data);

        const ventesResponse = await fetchVentes();
        setVentes(ventesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ligneDeVente = {
        quantite: parseInt(quantite, 10),
        prixUnitaire: parseFloat(prixUnitaire),
        produit: { produitID: selectedProduct },
        vente: { venteID: selectedVente }
      };
      await createLigneDeVente(ligneDeVente);
      // Réinitialiser le formulaire ou afficher un message de succès
      setQuantite(0);
      setPrixUnitaire(0);
      setSelectedProduct('');
      setSelectedVente('');
    } catch (error) {
      console.error('Error creating ligne de vente:', error);
      // Gérer les erreurs ici
    }
  };

  return (
    <div className="create-ligne-de-vente">
      <h2>Créer une ligne de vente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="produit">Produit:</label>
          <select id="produit" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">Sélectionner un produit</option>
            {products.map(product => (
              <option key={product.produitID} value={product.produitID}>{product.nom}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vente">Vente:</label>
          <select id="vente" value={selectedVente} onChange={(e) => setSelectedVente(e.target.value)}>
            <option value="">Sélectionner une vente</option>
            {ventes.map(vente => (
              <option key={vente.venteID} value={vente.venteID}>{vente.venteID}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantite">Quantité:</label>
          <input type="number" id="quantite" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="prixUnitaire">Prix unitaire:</label>
          <input type="number" id="prixUnitaire" value={prixUnitaire} onChange={(e) => setPrixUnitaire(e.target.value)} />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default CreateLigneDeVente;
