import React from 'react'
import sidebarcss from './sidebar.css';


const Sidebar = props =>{
let sidebar = "sidebar" ;
  if (!props.show) {
sidebar = "sidebar open" ;
} 
return (
   <div className={sidebar} >
  
  </div>
  
  
)
} 
export default Sidebar