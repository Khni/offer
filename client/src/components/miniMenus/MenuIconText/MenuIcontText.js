import React from 'react';
import { Link } from 'react-router-dom';
const MenuIcontText =(props) =>{


    
      return (
        <Link to={props.link} className={props.class} onClick={props.click}>
          <span className="icon-button-menu">{props.leftIcon}</span>
          <div className="text">{props.children}</div>
          {/* <span className="icon-right">{props.rightIcon}</span> */}
        </Link>
      );
    

    
  }

  export default MenuIcontText