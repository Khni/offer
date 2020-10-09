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
import {addItem} from '../../store/actions/CartItemsAction';
import StarRatings from 'react-star-ratings';
 
 class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.fetchHandle = this.fetchHandle.bind(this)
        
        this.state = {
          product:'',
          rating:'', 
          Loading: true, 
          fetch: false
        }
        
      }
      
     fetchHandle = (val) => {
    this.setState({
      fetch: val
    })
  } 
      
async fetchProduct(){
 
  const response =   await axios.get('/api/product/find/'+this.props.match.params.id);
  this.setState({product:  response.data.product, Loading: false, rating:  response.data.rating,})
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
    <PicComponent imgURL={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+this.state.product.imgURLs[0].imgURL}/>
   </div>
   <div className="StarRatingsContainer" >
<StarRatings
          rating={this.state.rating}
          starRatedColor='rgb(255,215,0)'
         starDimension="25px"
          numberOfStars={5}
          name='rating'
        />
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

 