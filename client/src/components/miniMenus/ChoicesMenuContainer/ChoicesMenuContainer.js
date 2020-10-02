import React, { useState } from 'react';

import MenuIcontText from '../MenuIcontText/MenuIcontText' 
const ChoicesMenuContainer =(props) =>{


   return (
      <div className="dropdown">
      {props.dropDownItems.map((item)=><MenuIcontText leftIcon={item.icon} link={item.link}>{item.title}</MenuIcontText>)}
      
      
          
      </div>
    )
  }

  export default ChoicesMenuContainer