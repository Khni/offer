import React from 'react';
import MenuItems from './menuItems.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
const menuItems = (props, {history,match})=>{
   
   return(
   
<Link className="item"
to={props.name}
>

<img src={props.imgURL}  className="item-img"/>

<p className="item-title">{props.name} </p>



<p className="item-before-price">   {props.price * 1.23}   EGP </p>

<p className="item-price">  {props.price}  EGP  </p>

</Link>


     );
}
export default menuItems;