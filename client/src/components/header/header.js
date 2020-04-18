import React from 'react';
import headercss from './header.css';
import Offerenologo from './img/Offereno.png';
import menuicon from './img/menuicon.png';
import iconuser from './img/Iconuser.png';
import carticon from './img/carticon.png';
import { Link } from 'react-router-dom';

const Header =()=>{
  
  
  return(
    
    <div className="header">
    <div className="logo-Container">
    
    
    <div className="logo-container-left">
    
    <img src={menuicon} className="menuicon" />
    
    
    <Link to='/'>
    <img className="logo" src={Offerenologo} />
    </Link>
    </div>{/*logo cont left*/}
    <div class="logo-container-right">
    
    <Link className="icontext margin-right10" to='/signin'>
    <p className="signin-text icontext-text"> دخول </p>
    <img src={iconuser} className="icontext-icon" />
    </Link>
    
    
  
    <Link className="icontext" to='/signup'>
    
    <p  className="icontext-text">
    عربه
     الشراء
    </p>
    <img src={carticon} className="icontext-icon-cart" />
    </Link>
    
    
    </div>
    
    
    
    </div>
    
    <input type="text"
    className="input-text-search"
    placeholder="search... "
   / >
    
    
    </div> 
    );
  
  
}


export default Header;