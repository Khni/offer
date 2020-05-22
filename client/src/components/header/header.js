import React, {Component} from 'react';
import headercss from './header.css';
import Offerenologo from './img/Offereno.png';
import menuicon from './img/menuicon.png';
import iconuser from './img/Iconuser.png';
import carticon from './img/carticon.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/users.js';

class Header extends Component{
   
   constructor(props) {
    super(props);
    
  }
  render() {
  
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
     {!this.props.isAuth ?
    <Link className="icontext margin-right10" to='/signin'>
    <p className="signin-text icontext-text"> دخول </p>
    <img src={iconuser} className="icontext-icon" />
    </Link> :  null} 

        {this.props.isAuth ?
    <Link className="icontext margin-right10" to='/account'>
    <p className="signin-text icontext-text"> اهلا </p>
    <img src={iconuser} className="icontext-icon" />
    </Link>: null} 
    
    
  
    <Link className="icontext" to='/signup'>
  
    <p  className="icontext-text">
    عربه
     الشراء
     {this.props.msg} 
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
  
}


function mapStateToProps(state)  {
  return {
    isAuth: state.userAuth.isAuthenticated, 
    msg: state.userAuth.msg
  };
}
 
export default connect(mapStateToProps, actions)(Header);
 