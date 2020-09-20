import React from 'react';
import Section from './section.css';
import Item from '../menu-items/menuItems.js';


const section = (props)=>{
   
   return(
    

 <div className="section-menu">
 


  <h5 className="section-title">{props.title}</h5>
  


  <div className="menu-item">
{props.items.map((item , {...others}) => 
   <Item id={item._id} item={item} key={item._id} name={item.nameEn} imgURL={item.imgURLs[0].imgURL} price={item.price}
  {...others} />
 )}
 </div>

      
		</div>
     );
}

export default section;