import React from 'react';

const MenuIcontText =() =>{


    
      return (
        <a href={props.link} className="menu-item">
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    

    
  }

  export default MenuIcontText