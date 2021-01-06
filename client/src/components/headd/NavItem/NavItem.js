import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem =(props)=> {
    const [open, setOpen] = useState(false);
  
  
  const onClickItem =() =>{
setOpen(!open)
props.itemClick;
} 
    return (
      
        <Link to={props.link} className="icon-button" onClick={() => onClickItem()}>
          {props.icon}
          {open && props.children}
         
        </Link>
  
        
      
    );
  }

  export default NavItem