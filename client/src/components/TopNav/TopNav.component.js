import React from 'react'

import { 
  // Route,
   NavLink,
    // Switch, 
    // Redirect
  } from 'react-router-dom';

import TopNavStyle from './TopNavStyle.scss'






const TopNav = (props) => {

   

  return(   
       <nav className="top-items-nav">
        {props.navlinksArr.map((navlink, i)=>{
    
    return <NavLink key={i} className="top-NavLinkItems"
                                to={{
                                  pathname:navlink.path
                              }}
                             
                               
                                activeClassName="active-top-NavLinkItems"
                               >{navlink.title}</NavLink>
      })} 
      
      
      
   

</nav>
 

    

     




         
        )
   
}





export default TopNav