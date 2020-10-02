import React from 'react';
import { Link } from 'react-router-dom';
const MenuIcontText =(props) =>{


    
      return (
        <Link to={props.link} className="menu-item">
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </Link>
      );
    

    
  }

  export default MenuIcontText