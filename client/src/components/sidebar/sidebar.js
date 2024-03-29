import React from 'react'
import './sidebar.scss';
import MenuIcontText from '../miniMenus/MenuIconText/MenuIcontText'
import { ReactComponent as Favorite } from '../icons/header/favorite.svg';
import { ReactComponent as Orders } from '../icons/header/orders.svg';
import { ReactComponent as View } from '../icons/header/view.svg';
import { ReactComponent as Settings } from '../icons/header/setting.svg';
import { ReactComponent as Close } from '../icons/close.svg';
// import { ReactComponent as User } from '../icons/header/usern.svg';
import { ReactComponent as Avatar } from '../icons/header/avatar.svg';
import Offerenologo from '../header/img/juv.png';
// import { ReactComponent as UserLogged } from '../icons/header/userlogged.svg';
import { ReactComponent as Egypt } from '../icons/egypt.svg';
import { ReactComponent as Us } from '../icons/us.svg';
//import * as actions from '../../store/actions/cartAction.js'
import * as actions from '../../store/actions'
import { selectTermsLang, selectLang } from '../../store/reducers/langReducer/langsReselect';
// import NavItem from '../headd/NavItem/NavItem'
import { SidebarData } from './DataMenu';
import SubMenu from './SubMenu';
import styled from 'styled-components';
import * as MdIcons from 'react-icons/md'
import {
  // cartHidden,
  sidebarHidden
  // , selectCartItems
} from '../../store/reducers/cart/cartReselect'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const SetLanguage = styled.p`
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
`;



const Sidebar = props => {
  let sidebar = props.class;
  if (!props.show) {
    sidebar = props.class + ' open';
  }

  let miniMenuItem = "miniMenuItem-sidebar"
  if (props.class === "sidebarAr") {
    miniMenuItem = "miniMenuItem-sidebarAr"
  }

  let SetEnglishFunc = () => {
    props.setEnglish()

    // window.location.reload(false);
    //props.openSidebar()
  }
  let SetArabicFunc = () => {
    props.setArabic()

    // window.location.reload(false);
    // props.openSidebar()
  }
  return (

    <div className={sidebar} >

      <div>
        <div className="icon-s svg-darkbg centerdiv" onClick={props.openSidebar}><Close /></div>
        {/* <Link className="icon-button-noBorde" to='/'>
          <img alt="JUVNI" onClick={props.openSidebar} className="logoSidebar" src={Offerenologo} />
        </Link>


        {props.isAuth && props.token && !props.errorMsg ?
          <div>
            <Link className="avatar-sidebar" to='/settings/details' >
                 <Avatar /> 
                
                </Link> 
            <h5>Welcome, {props.name}! :)</h5>
          </div> : <Link to='/authnav'>

            <h5>Login or Sign up here</h5>

          </Link>} */}
        {SidebarData.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        })}


        {props.lang === 'ar' ?

          <SetLanguage onClick={() => SetEnglishFunc()}>
            
            English <MdIcons.MdLanguage  />
          </SetLanguage>


          :
          <SetLanguage onClick={() => SetArabicFunc()}>
           <MdIcons.MdLanguage  /> Arabic
          </SetLanguage>



        }
        {/* <MenuIcontText class={miniMenuItem} leftIcon={<Settings />} link='/settings' click={props.openSidebar}>{props.terms.settings}</MenuIcontText>
  <MenuIcontText class={miniMenuItem}   leftIcon={<Orders />} link='/orders' click={props.openSidebar}>{props.terms.orders}</MenuIcontText>
  <MenuIcontText class={miniMenuItem}  leftIcon={<Favorite />} link='/orders' click={props.openSidebar}>{props.terms.favorites}</MenuIcontText>
  <MenuIcontText class={miniMenuItem}   leftIcon={<View />} link='/orders' click={props.openSidebar}>{props.terms.viewed}</MenuIcontText>
  
  */}




      </div>
    </div>


  )
}

function mapStateToProps(state) {
  return {
    lang: selectLang(state),
    terms: selectTermsLang(state),
    isAuth: state.userAuth.authUser.isAuthenticated,
    errorMsg: state.userAuth.authUser.error,
    token: state.userAuth.authUser.token,
    name: state.userAuth.authUser.name,
    // hidden: cartHidden(state) ,
    hiddenSidebar: sidebarHidden(state),
    // totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}
// const mapDispatchToProps = dispatch => {
//     return {

//         openSidebar: () => dispatch( actions.openSidebar()), 
//       setEnglish: () => dispatch( actions.setEnglish()), 

//       setArabic: () => dispatch( actions.setArabic())
// };

// } 

export default connect(mapStateToProps, actions)(Sidebar);