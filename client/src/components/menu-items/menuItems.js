import React, { useState } from 'react';
import './menuItems.scss';
// import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { ReactComponent as AddFavorite } from '../productPage/icons/heartempty.svg'
import { ReactComponent as FavoriteAdded } from '../productPage/icons/Heartfull.svg'
import AddToCartBtn from '../addToCartBtn/addToCartBtn'
import { connect } from 'react-redux';
import { addItem } from '../../store/actions/CartItemsAction';
import { withRouter } from 'react-router-dom';
import * as Cartactions from '../../store/actions/CartItemsAction';
import { selectCartItems } from '../../store/reducers/cart/cartReselect';
import axiosInstance from '../../helpers/axiosInstance'
import * as actions from '../../store/actions/index';
import AlarmWindow from '../alarmWindow/alarmWindow'
const MenuItem = (props) => {
  // useEffect(async() => {
  //   await props.favoriteListAction(props.token)
  //   const fav = props.FavoritesList.find((favorite) => favorite._id == props.item._id)
  //   if (fav) {
  //     setFavorite(true) 
  //   } else {
  //     setFavorite(false) 
  //   }

  //   }, [])
  const [alarmWindow, showAlarmWindow] =useState(false)

  const [favorite, setFavorite] = useState(props.item.isFav);
  const ToggleFavorite = async (productID) => {

    if (!props.token) {
      return
    }

    console.log("from toggle favorite prepare for axios");
    setFavorite(!favorite)

    try {
     
      
      const response = await axiosInstance(null, props.token, props.RefreshToken, props.refreshToken).post('/api/favorite/addanddelete', { productID: productID }, props.token)
      let message = "Removed from Favorite List"
      if (!response.data.deleted) {
        message= "Added To Favorite List"
      }
      props.toggleHintBox(message) 
      console.log("responsssses" + JSON.stringify(response) );
    } catch (e) {
      if (e) {
        setFavorite(!favorite)

      }
    }
  }





  return (
    <div>
      

      <div className="item"
      >
        
        <div onClick={() => props.history.push(`${props.match.url + "item/"}${props.id}`)} >





          <img alt={props.item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" + props.imgURL} className="item-img" />

          <p className="item-title-menu-item">{props.item.nameEn} </p>



          <p className="item-before-price">   {props.item.price * 1.23}   EGP </p>

          <p className="item-price">  {props.item.price}  EGP  </p>


        </div>
        <div className="flex-row marginTop50">
        
          <AddToCartBtn
            cartItems={props.cartItems}
            item={props.item}
            showAlarmWindowAction={props.showAlarmWindowAction} 
            addItemToCartItem={props.addItemToCartItem} />
          {favorite ?
            <div className="icon-button-favorite  pointer hoverscalein" onClick={async () => { await ToggleFavorite(props.item._id); }}>
              <FavoriteAdded /></div>
            :
            <div className="icon-button pointer hoverscalein" onClick={async () => { await ToggleFavorite(props.item._id); }}>
              <AddFavorite /></div>
          }
        </div>
      
        
      </div>










    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  addItemToCartItem: (item, items) => dispatch(Cartactions.addItemToCartItem(item, items)),
  favoriteListAction: (token) => dispatch(actions.fetchFavorites(token)),
  refreshToken: (token, refreshToken) => dispatch(actions.refreshToken(token, refreshToken)),
  showAlarmWindowAction: (btns, title) => dispatch(actions.showAlarmWindowAction(btns, title)),
  hideAlarmWindowAction: () => dispatch(actions.hideAlarmWindowAction()),
  toggleHintBox: (msg) => dispatch(actions.toggleHintBox(msg)),
  
});
const mapStateToProps = (state) => {
  return {
    //collections: selectProducts(state), 
    showAlarmWindow: state.hintBoxReducer.alarmWindow.show,
    RefreshToken: state.userAuth.authUser.refreshToken,
    token: state.userAuth.authUser.token,
    FavoritesList: state.FavAndSeenReducer.favorites.list,
    cartItems: selectCartItems(state),
    categories: state.categoryReducer.categories,
    sectionsWithProductsFetched: state.categoryReducer.sectionsWithProductsFetched,
    sectionsWithProducts: state.categoryReducer.sectionsWithProducts
    //collections: state.ProductsReducer.products
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem));