import React from 'react'
import sidebarcss from './sidebar.css';


const Sidebar = props =>{
let sidebar = "sidebar" ;
  if (!props.show) {
sidebar = "sidebar open" ;
} 
return (
   <div className={sidebar} >
  <div>
<p className="sidebaritems" >  حسابي </p>
<p className="sidebaritems">  طلباتي </p>
<p className="sidebaritems">  المنتجات المفضلة </p>
<p className="sidebaritems">  عربة الشراء </p>
<p className="sidebaritems">  خدمة العملاء </p>
<p className="sidebaritems"> أفضل العروض </p>
  </div>
  </div>
  
  
)
} 
export default Sidebar