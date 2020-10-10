import React ,{Component} from 'react'
import axios from 'axios';
import PicComponent from './pic/pic.component'
import MiddleComponent from './middle/middle.component'
import DiscComponent from './disc/disc.component'
import {connect} from 'react-redux'
import {selectItem} from '../../store/reducers/products/productsReselect'
import Style from './ProductPage.scss'
import Reviews from './reviews/reviews.component.js' 
import Header from '../headd/header/header'
import Slider from '../carousel/components/slider'


import {addItem} from '../../store/actions/CartItemsAction';
import StarRatings from 'react-star-ratings';
 import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
// import AwesomeSliderStyles from 'react-awesome-slider/dist/custom-animations/cube-animation.css';
// import withCaption from 'react-awesome-slider/dist/captioned';
// import 'react-awesome-slider/dist/styles.css';
// import 'react-awesome-slider/dist/captioned.css';
 import MenuItem from '../menu-items/menuItems'
 class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.fetchHandle = this.fetchHandle.bind(this)
        
        this.state = {
          product:'',
          rating:'', 
          Loading: true, 
          fetch: false, 
          imgUrlsArr:[] 
        }
        
      }
      
     fetchHandle = (val) => {
    this.setState({
      fetch: val
    })
  } 
    
async fetchProduct(){
 
  const response =   await axios.get('/api/product/find/'+this.props.match.params.id);
  const imgUrls =response.data.product.imgURLs.map(img=>
  "https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" +img.imgURL) 
  this.setState({product:  response.data.product, Loading: false, rating:  response.data.rating,imgUrlsArr:imgUrls})
  
  if (this.state.fetched){
  this.setState({fetch: false})
  }
  console.log("productPage: " + this.state.product.price);
}



async componentDidMount(){
	
	await this.fetchProduct()


}
async componentDidUpdate(){

if (this.state.fetched){
  await this.fetchProduct()
  }

}
 




      render(){
        console.log(this.props.match.params.id);
    
        return(

<div>
  <Header />
          {!this.state.Loading?    <div className="container-productPage">
    <div className="PicComponent">
    
    
    <Slider slides={this.state.imgUrlsArr} autoPlay={2} />
    
   {/* <Carousel infiniteLoop  showThumbs={true} autoPlay interval="5000" transitionTime="5000"  thumbWidth="100px"  >
    {this.state.imgUrlsArr.map(img=> <div>
                    <img  src={img} />
                    <p className="legend">Legend 1</p>
                </div>)} 
                
                
            </Carousel>*/} 
            
            {/*this.state.product.imgURLs.map(img=> <div>
                    <img  src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" +img.imgURL} />
                    <p className="legend">Legend 1</p>
                </div>)*/} 
            
            
            
            {/* <AwesomeSlider cssModule={AwesomeSliderStyles}>
            {this.state.product.imgURLs.map(img=> <div>
                    <img  src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" +img.imgURL} />
                    
                </div>)} 
  </AwesomeSlider> */}
    

   
    
    
    
   </div>
   {/* <div className="menu-items">
{this.state.product.imgURLs.map((img) => 
<div className="itemj">
  <img src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+img.imgURL}  className="item-imgs"/>  
  </div>
 )}
 </div> */}
   <StarRatings
          rating={this.state.rating}
          starRatedColor='rgb(255,215,0)'
         starDimension="25px"
         starSpacing="1px"
          numberOfStars={5}
          name='rating'
        />
   <div className="StarRatingsContainer" >

</div>
   <div className="MiddleComponent">
   <MiddleComponent name={this.state.product.nameEn} price={this.state.product.price} item={this.state.product} />
   </div>
   <div className="DiscComponent">
   <DiscComponent />
   </div> 



<Reviews 
fetchHandle = {this.fetchHandle}
productID ={this.state.product._id}
reviews ={this.state.product.reviews}
userToken ={this.props.token}
/>

   </div>: <div className="loaderHome"/> }
</div>
        );
      }
 }

 const mapStateToProps =(state) =>{
	return {
		token: state.userAuth.authUser.token,
 
	}
}





export default connect(mapStateToProps)(ProductPage);

 