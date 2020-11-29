import React, { Component } from 'react'
import axios from 'axios';
// import PicComponent from './pic/pic.component'
import MiddleComponent from './middle/middle.component'
import DiscComponent from './disc/disc.component'
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
import MenuItem from '../menu-items/menuItems'
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
      favorite: false
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
      await this.props.favoriteListAction(this.props.token)

      const productID = response.data.product._id

      this.favoriteCheck(productID)
    }


    this.setState({ product: response.data.product, Loading: false, rating: ProductRating, imgUrlsArr: imgUrls, reviews: response.data.productReviews.reverse() })

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
      const response = await Calls.postDataHeaderAuth('/api/favorite/addanddelete', { productID: this.state.product._id }, this.props.token)
   console.log("response"+ response);
    } catch (e) {
      console.log("e"+ e.response.data.error);
      if ( e.response.data.error =="TokenExpiredError") {
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
    const response = await Calls.postDataHeaderAuth('/api/viewed/add', { productID: this.state.product._id }, this.props.token)
  }



  async favoriteCheck(productID) {

    const fav = this.props.FavoritesList.find((favorite) => favorite._id == productID)

    if (fav) {
      this.setState({ favorite: true })
    } else {
      this.setState({ favorite: false })
    }

  }

  async componentDidMount() {
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

        {!this.state.Loading ? <div className="container-productPage">
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


          <div className="StarRatingsContainer" >

          </div>
          <div className="MiddleComponent">
            <MiddleComponent
              favorite={this.state.favorite}
              name={this.state.product.nameEn}
              price={this.state.product.price}
              item={this.state.product}
              ToggleFavorite={this.ToggleFavorite}
            />
          </div>
          <div className="DiscComponent">
            <DiscComponent />
          </div>



          <Reviews
            fetchHandle={this.fetchHandle}
            productID={this.state.product._id}
            reviews={this.state.reviews}
            userToken={this.props.token}
          />


        </div> : <div className="loaderHome" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FavoritesLoading: state.FavAndSeenReducer.favorites.Loading,
    token: state.userAuth.authUser.token,
    id: state.userAuth.authUser.id,
    FavoritesList: state.FavAndSeenReducer.favorites.list,
    cartItems: selectCartItems(state)

  }
}

const mapDispatchToProps = dispatch => ({
  addItemToCartItem: (item, items) => dispatch(Cartactions.addItemToCartItem(item, items)),
  favoriteListAction: (token) => dispatch(actions.fetchFavorites(token)),
});



export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

