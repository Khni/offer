import React, {Component} from 'react'

import { Route, NavLink, Switch ,Redirect} from 'react-router-dom';

import FixedSideMenuNavStyle from './FixedSideMenuNav.scss'
const FixedSideMenuNav = (props) => {

   
    

    


        return(

    <nav className="side-nav">
    <h3 className="side-nav-title">{props.title}</h3>
    {props.navlinksArr.map((navlink, i)=>{
return     <NavLink key={i} className="side-NavLink"
                                to={{
                                  pathname:navlink.path
                              }}
                             
                               
                                activeClassName="active-NavLinkAdmin-side"
                                activeStyle={{
                                  //  color: '#fa923f',
                                  //  textDecoration: 'underline',
                                  background: "#dfe3ee",
                                 // color: "#ffffff"
                                }}>{navlink.title}</NavLink>
      })} 
                            
                                
          
                            {props.btns? 
                       props.buttons.map((btn , i)=>
                          <button key={i} className="custum-btn-sidenav" onClick={btn.onClickFunc }>{btn.title}</button>
                       )   
                       : null}  
    
    

    </nav>
    
   
    



       
        )
    
}



export default FixedSideMenuNav
