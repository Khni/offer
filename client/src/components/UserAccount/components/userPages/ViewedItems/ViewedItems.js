import React, {Component} from 'react'
//import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from '../addItemToServer/addProduct.component'
//import ProductsList from '../TableList/productsList.component'
import TopNavStyle from '../../../../TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../TopNav/TopNav.component'
import * as actions from '../../../../../store/actions';
import axios from 'axios';

class UserSeenList extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          products:[],
          
          Loading: true, 
          fetch: false, 
          
        }
        
    }


async fetchSeenList(){
 console.log("started");
  const response =   await axios.get('/api/products-seen-list', {
    headers : { Authorization: `Bearer ${this.props.token}`
     }} );
     this.setState({products: response.data.SeenProducts, Loading: false})
     
  //   this.fetchHandle(true)
   console.log("response favoirte toggle"+JSON.stringify(response) );
}


async componentDidMount() {
await this.fetchSeenList()

  }
  



    render() {

      
        return(


     <div className="TopNavPage">
       
      {!this.state.Loading? 
      
      <div className="cartItemContainer">
      
      {this.props.seenList.map(item=>(


<div className="cart-Item" >
 
 <div className="cart-item-desc">
   <img src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+item.imgURLs[0].imgURL} className="cart-item-img"/>
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{item.nameEn} </p>
      <p className="cart-item-before-price margin0">   EGP {item.price *1.24} </p>
      <p className="cart-item-price margin0">   EGP   {item.price}  </p>
    </div>{/* end of cart-utem-details*/}
  </div>{/* end of cart-item-desc*/}
  
   



{/*cart-item */} 
</div> 
  ))} 

      </div>
      
      
      
      :     <div className="loader"/>  } 
         
         

 

    

      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	seenList: state.FavAndSeenReducer.seen.list,
  	errorMsg: state.userAuth.authUser.error, 
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated
    
  }

}

const mapDispatchToProps = dispatch => {
  return {
    fetchSeen: ( token) => dispatch( actions.fetchSeen( token) ),
      //authLeft: () => dispatch( actions.authLeft())
    //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
  };
};


export default  connect(mapStateToProps, actions)(UserSeenList);