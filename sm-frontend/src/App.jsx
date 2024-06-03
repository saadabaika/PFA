import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './Home';
import ClientList from './components/Clients';
import CreateClient from './components/CreateClient';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import UpdateClient from './components/UpdateClient';
import ProductsList from './components/ProductsList';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import AlertProduct from './components/AlertProduct';
import LignesDeVenteList from './components/LignesDeVenteList';
import CreateLigneDeVente from './components/CreateLigneDeVente';
import Ventes from './components/Ventes';
import CreateVente from './components/CreateVente';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Report from './components/Report';
import Historique from './components/Historique'; 

const App = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmed) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');}
    }

  return (
    <div className='grid-container'>
      {isAuthenticated && <Header OpenSidebar={OpenSidebar} onLogout={handleLogout} />}
      {isAuthenticated && <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />}
      
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route 
          path='/clients' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ClientList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/produits' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductsList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/createClient' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateClient />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/clients/:id' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateClient />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/createProduct' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateProduct />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/products/:id' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProduct />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/alertProduct' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AlertProduct />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/lignesdevente' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LignesDeVenteList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/createLigneDeVente' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateLigneDeVente />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/ventes' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Ventes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/createVente' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateVente />
            </ProtectedRoute>
          } 
        />
         <Route
          path='/report' 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Report />
            </ProtectedRoute>
          }
        />
       <Route 
  path='/clients/:id/historique' 
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Historique />
    </ProtectedRoute>
  } 
/>
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
