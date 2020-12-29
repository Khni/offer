import React
  // , { useState }
  from 'react';


import MenuIcontText from '../MenuIconText/MenuIcontText'
const ChoicesMenuContainer = (props) => {


  return (
    <div className="dropdown">
      {props.dropDownItems.map((item) => <MenuIcontText class="miniMenuItem-drop" leftIcon={item.icon} link={item.link}>{item.title}</MenuIcontText>)}



    </div>
  )
}

export default ChoicesMenuContainer