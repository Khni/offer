import React from 'react';
import Section from './section.css';
import Item from '../menu-items/menuItems.js';


const section = (props)=>{
   
   return(
    

 <div className="section-menu">
 


  <h5 className="section-title">{props.title}</h5>
  


  <div className="menu-item">
{props.items.map((item , {...others}) => 
   <Item item={item} key={item.id} name={item.name} imgURL={item.imageUrl} price={item.price}
  {...others} />
 )}
 </div>

      
		</div>
     );
}

export default section;