import React from 'react'
import popupstyle from './popup.scss';


const Popup = props =>{
let popupmenu = "popupmenua" ;
  if (!props.show) {
    popupmenu = "popupmenua open" ;
} 
return (
   <div className={popupmenu} >
  <table className="Table-popup">
{props.menu.map((m) => <tr className="popupmenu-items">{m.title}</tr>)}
  </table>
  </div>
  
  
)
} 
export default Popup