import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './Home'
import ClientList from './components/Clients'
import CreateClient from './components/CreateClient'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateClient from './components/UpdateClient'
import ProductsList from './components/ProductsList'
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import AlertProduct from './components/AlertProduct';
import LignesDeVenteList from './components/LignesDeVenteList';
import CreateLigneDeVente from './components/CreateLigneDeVente';
import Ventes from './components/Ventes';
import CreateVente from './components/CreateVente';
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Router>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Routes>
          <Route 
            path='/clients'
            element={<ClientList />}
          />
          <Route 
            path='/produits'
            element={<ProductsList />}
          />
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/createClient'
            element={<CreateClient />}
          />
          <Route
            path='/clients/:id'
            element={<UpdateClient />}
          /> 
          
          <Route path='/createProduct'
           element={<CreateProduct />}
          />
          
          <Route path="/products/:id" 
          element={<UpdateProduct />} 
          />
          <Route path='/alertProduct' 
           element={<AlertProduct />} />
           <Route path='/lignesdevente' 
           element={<LignesDeVenteList />} />
          <Route path='/createLigneDeVente'
           element={<CreateLigneDeVente />} />
           <Route path='/ventes'
            element={<Ventes />} />
            <Route 
            path='/createVente'
            element={<CreateVente />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App
