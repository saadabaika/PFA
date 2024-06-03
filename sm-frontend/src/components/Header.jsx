import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { GrLogout } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';


const Header = ({ OpenSidebar, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };
  

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
       {/* <BsPersonCircle className='icon' />*/}
        <GrLogout className='icon' onClick={handleLogout} /> 
      </div>
    </header>
  );
};

export default Header;
