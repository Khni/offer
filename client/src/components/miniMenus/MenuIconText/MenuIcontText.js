import React from 'react';
import { Link } from 'react-router-dom';
const MenuIcontText =(props) =>{


    
      return (
        <Link to={props.link} className="miniMenu-item">
          <span className="icon-button-menu">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </Link>
      );
    

    
  }

  export default MenuIcontText