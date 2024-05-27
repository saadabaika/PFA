import axios from "axios";
const BASE_URL = 'http://localhost:8080'

export const fetchClients = (name = null) => {
  let url = `${BASE_URL}/api/clients`;
  if (name) {
    url += `?name=${name}`;
  }
  return axios.get(url);
};

export const fetchProducts = () => {
  return axios.get(`${BASE_URL}/api/produits`)
};


export const fetchLignesDeVente = () => {
  return axios.get(`${BASE_URL}/api/lignesdevente/all`)
};



export const createClient = async (client) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/clients`, client); 
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const deleteClient = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/clients/${id}`);
      return response.data; 
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  };

export const updateClient = async (id, updatedClientData) => {
  try{
    const response = await axios.put(`${BASE_URL}/api/clients/${id}`, updatedClientData);
      return response.data; 
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};
export const deleteproduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/produits/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/produits/create`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateProduct = async (productId, updatedProductData) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/produits/${productId}`, updatedProductData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getProductById = async (id) => {
  try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
  } catch (error) {
      throw error;
  }
};
export const getProduitsStockFaible = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/produits/stock-faible`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits à stock faible", error);
    throw error;
  }
};
export const createLigneDeVente = async (ligneDeVente) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/lignesdevente/create`, ligneDeVente, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchVentes = () => {
  return axios.get(`${BASE_URL}/api/ventes`);
};
export const createVente = async (venteData) => {
  try {
    console.log('Sending venteData to API:', venteData); // Log the data being sent
    const response = await axios.post(`${BASE_URL}/api/ventes/create`, venteData);
    return response.data;
  } catch (error) {
    console.error('Error creating vente:', error);
    throw error;
  }
};
