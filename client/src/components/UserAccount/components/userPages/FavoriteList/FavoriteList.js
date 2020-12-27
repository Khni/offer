import React, {Component} from 'react'
//import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';

//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from '../addItemToServer/addProduct.component'
//import ProductsList from '../TableList/productsList.component'
import  '../../../../TopNav/TopNavStyle.scss'
// import TopNavComponent from '../../../../TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/index';
import axios from 'axios';

class UserFavorites extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          products:[],
          
          Loading: true, 
          fetch: false, 
          
        }
        
    }


async fetchFavorites(){
 console.log("started");
  const response =   await axios.get('/api/user-favorites-list', {
    headers : { Authorization: `Bearer ${this.props.token}`
     }} );
     
     let compare = async (a, b) =>{
        const userIndex =  a.favorites.indexOf(a.favorites.find((f)=>  f.userID ===this.props.id))
         
        const createdA = a.favorites[userIndex].created; 
        const createdB = b.favorites[userIndex].created; 
        
     
        
        let comparison = 0;
         if (createdA > createdB) { comparison = 1; } else if
          (createdA < createdB) { 
          comparison = -1;
           } 
          return comparison; }

let favList =  response.data.UserFavorites

let FavoritesUser =  favList.sort(compare)

     
     
     
     
     
     this.setState({products: FavoritesUser, Loading: false})
     
  //   this.fetchHandle(true)
   console.log("response favoirte toggle"+JSON.stringify(response) );
}


async componentDidMount() {
//await this.fetchFavorites()

this.props.favoriteListAction(this.props.token)
console.log("favorite log"+ this.props.FavoritesLoading);
  }
  



    render() {

      
        return(


     <div className="TopNavPage">
       
      {!this.props.FavoritesLoading? 
      
      <div className="cartItemContainer">
      
      {this.props.FavoritesList.reverse().map(item=>(


<div className="cart-Item" >
 
 <div className="cart-item-desc">
   <img alt={item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+item.imgURLs[0].imgURL} className="cart-item-img"/>
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
  	errorMsg: state.userAuth.authUser.error, 
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    id: state.userAuth.authUser.id,
    FavoritesList: state.FavAndSeenReducer.favorites.list,
    FavoritesLoading : state.FavAndSeenReducer.favorites.Loading,
    isAuthenticated: state.userAuth.authUser.isAuthenticated
    
  }

}

// const mapDispatchToProps = dispatch => {
//   return {
//     favoriteListAction: ( token) => dispatch( actions.fetchFavorites( token) ),
//       //authLeft: () => dispatch( actions.authLeft())
//     //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
//   };
// };



export default  connect(mapStateToProps, actions)(UserFavorites);