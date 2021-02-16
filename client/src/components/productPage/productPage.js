import React, { Component } from 'react'
import axios from 'axios';
// import PicComponent from './pic/pic.component'
import MiddleComponent from './middle/middle.component'
import DiscComponent from './disc/disc.component'
import axiosInstance from '../../helpers/axiosInstance'
import { connect } from 'react-redux'

// import {selectItem} from '../../store/reducers/products/productsReselect'
import './ProductPage.scss'
import Reviews from './reviews/reviews.component.js'
import Header from '../headd/header/header'

import Slider from '../carousel/components/slider'
import * as Cartactions from '../../store/actions/CartItemsAction';
import * as actions from '../../store/actions/index';
// import { ReactComponent as AddFavorite } from './icons/heartempty.svg'
// import { ReactComponent as FavoriteAdded } from './icons/Heartfull.svg'
// import {addItem} from '../../store/actions/CartItemsAction';
import StarRatings from 'react-star-ratings';
//  import ReactDOM from 'react-dom';
import { selectCartItems } from '../../store/reducers/cart/cartReselect';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
// import AwesomeSliderStyles from 'react-awesome-slider/dist/custom-animations/cube-animation.css';
// import withCaption from 'react-awesome-slider/dist/captioned';
// import 'react-awesome-slider/dist/styles.css';
// import 'react-awesome-slider/dist/captioned.css';

import * as Calls from '../../store/actions/axiosCalls'
const awsImgUrl = "https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.fetchHandle = this.fetchHandle.bind(this)
    this.ToggleFavorite = this.ToggleFavorite.bind(this)
    this.state = {
      product: '',
      rating: '',
      Loading: true,
      fetch: false,
      imgUrlsArr: [],
      reviews: [],
      favorite: false, 
      outOfStock: false
    }

  }

  fetchHandle = (val) => {
    this.setState({
      fetch: val
    })
  }

  async fetchProduct() {

    const response = await axios.get('/api/productWithReviews/' + this.props.match.params.id);
    const product = response.data.product
    console.log("product" + JSON.stringify(product));
    const imgUrls = response.data.product.imgURLs.map(img =>
      awsImgUrl + img.imgURL)
    let ProductRating = response.data.rating



    if (this.props.token) {
      await this.props.favoriteListAction(this.props.token, this.props.RefreshToken, this.props.refreshToken)

      const productID = response.data.product._id

      this.favoriteCheck(productID)
    }


    this.setState({outOfStock:response.data.outOfStock, product: response.data.product, Loading: false, rating: ProductRating, imgUrlsArr: imgUrls, reviews: response.data.productReviews.reverse() })

    if (this.state.fetch) {
      this.setState({ fetch: false })
    }

  }


  async ToggleFavorite() {
    if (!this.props.token) {
      return
    }

    this.setState({ favorite: !this.state.favorite })
    try {

      const response = await axiosInstance(null, this.props.token, this.props.RefreshToken, this.props.refreshToken).post('/api/favorite/addanddelete', { productID: this.state.product._id })
      let message = "Removed from Favorite List"
      if (!response.data.deleted) {
        message= "Added To Favorite List"
      }
      this.props.toggleHintBox(message) 
      //  const response = await Calls.postDataHeaderAuth('/api/favorite/addanddelete', { productID: this.state.product._id }, this.props.token)
      
      console.log("responsssse" + response );
    } catch (e) {
      console.log("e" + e.response.data.error);
      if (e.response.data.error === "TokenExpiredError") {
        console.log("token is Expired");
        //try to refresh the token if its expired


        try {
          // const response = await Calls.getDataHeaderAuth('/api/token/refresh',this.props.token)

        } catch (error) {

        }

        //end of refresh try



      }
      if (e) {
        this.setState({ favorite: !this.state.favorite })

      }
    }



  }

  async addSeenProduct() {
    await Calls.postDataHeaderAuth('/api/viewed/add', { productID: this.state.product._id }, this.props.token)
  }



  async favoriteCheck(productID) {

    const fav = this.props.FavoritesList.find((favorite) => favorite._id === productID)

    if (fav) {
      this.setState({ favorite: true })
    } else {
      this.setState({ favorite: false })
    }

  }

  async componentDidMount() {
    //   try{
    //     const response = await calls.postDataHeaderAuth('/api/user/refreshToken',{ token: this.props.token}, this.props.RefreshToken )
    //     console.log("resAuth" +response.status );
    //     if(response.status== 201) {
    //       console.log("status created");
    //       console.log("res token "+JSON.stringify(response) );
    // await this.props.refreshToken(response.data.token, response.data.refreshToken)
    //    } 
    //    } catch(e) {
    //      console.log("e" +e.response.data.error);
    // this.props.logout()
    // } 

    //await this.props.authCheck(this.props.token,this.props.RefreshToken)
    await this.fetchProduct()
    if (this.props.token) {
      await this.addSeenProduct()
    }


  }
  async componentDidUpdate() {

    if (this.state.fetch) {
      await this.fetchProduct()

    }

  }





  render() {


    return (

      <div className="product-container" >
        <div className="header-container">
          <Header />
        </div>

        {!this.state.Loading && !this.state.outOfStock ? <div className="container-productPage">

          <div className="PicAndMiddleComponent">
            <div className="PicComponent">


              <Slider slides={this.state.imgUrlsArr} autoPlay={4} />
              <StarRatings
                rating={this.state.rating}
                starRatedColor='rgb(255,215,0)'
                starDimension="25px"
                starSpacing="1px"
                numberOfStars={5}
                name='rating'
              />

            </div>


            <div className="MiddleComponent">
              <MiddleComponent
                favorite={this.state.favorite}
                isAuthenticated={this.props.isAuthenticated}
                token={this.props.token}
                name={this.state.product.nameEn}
                price={this.state.product.price}
                item={this.state.product}
                ToggleFavorite={this.ToggleFavorite}
                showAlarmWindowAction={this.props.showAlarmWindowAction}
              />
            </div> 
           
          </div>

          

          <div className="ReviewsComponent">
            <Reviews
              fetchHandle={this.fetchHandle}
              productID={this.state.product._id}
              reviews={this.state.reviews}
              userToken={this.props.token}
            />

          </div> 



        </div> : null}

        {this.state.Loading ?<div className="loaderHome" /> : null }

        {this.state.outOfStock ?<div><Slider slides={this.state.imgUrlsArr} autoPlay={4} /> <h3>Out Of Stock</h3></div>  : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FavoritesLoading: state.FavAndSeenReducer.favorites.Loading,
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated,
    RefreshToken: state.userAuth.authUser.refreshToken,
    id: state.userAuth.authUser.id,
    FavoritesList: state.FavAndSeenReducer.favorites.list,
    cartItems: selectCartItems(state)

  }
}

const mapDispatchToProps = dispatch => ({
  addItemToCartItem: (item, items) => dispatch(Cartactions.addItemToCartItem(item, items)),
  favoriteListAction: (token, refreshToken, refreshTokenFunc) => dispatch(actions.fetchFavorites(token, refreshToken, refreshTokenFunc)),
  logout: () => dispatch(actions.logout()),
  authCheck: async (token, refreshToken) => dispatch(actions.authCheck(token, refreshToken)),
 toggleHintBox: (msg) => dispatch(actions.toggleHintBox(msg)),
 showAlarmWindowAction: (btns, title) => dispatch(actions.showAlarmWindowAction(btns, title)),
  refreshToken: (token, refreshToken) => dispatch(actions.refreshToken(token, refreshToken)),
});



export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

