import React from 'react'

import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsFillBagFill, BsCheckCircleFill }
 from 'react-icons/bs'

import { Link } from 'react-router-dom'; 

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SALES MASTER
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/clients">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/produits">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
        
            <li className='sidebar-list-item'>
                <a href="/ventes">
                    <BsFillBagFill className='icon'/> Vente
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/lignesdevente">
                    <BsCheckCircleFill  className='icon'/> Ligne De Vente
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
            
            
        </ul>
    </aside>
  )
}

export default Sidebar