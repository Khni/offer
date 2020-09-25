import React ,{Component} from 'react'
import axios from 'axios';
import PicComponent from './pic/pic.component'
import MiddleComponent from './middle/middle.component'
import DiscComponent from './disc/disc.component'
import {connect} from 'react-redux'
import {selectItem} from '../../store/reducers/products/productsReselect'
import Style from './ProductPage.scss'
import Header from '../header/header'
import {addItem} from '../../store/actions/CartItemsAction';

 class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          product:'',
          Loading: true
        }
        
      }
async fetchProduct(){
 
  const response =   await axios.get('/api/product/find/'+this.props.match.params.id);
  this.setState({product:  response.data.product})
  
  console.log("productPage: " + this.state.product.price);
}

async componentDidMount(){
await this.fetchProduct()
this.setState({Loading: false})
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
   <div className="MiddleComponent">
   <MiddleComponent name={this.state.product.nameEn} price={this.state.product.price} item={this.state.product} />
   </div>
   <div className="DiscComponent">
   <DiscComponent />
   </div> 

   </div>: <div className="loaderHome"/> }
</div>
        );
      }
 }

 const mapStateToProps = (state, ownProps) => ({
  /*ItemProduct: state.ProductsReducer.products.find((col)=>{

    return col.id ===1
  })*/
  
 // Item: state.ProductsReducer.products.flatMap((col)=>  col.items).find((item)=> item.id ==  ownProps.match.params.id )
 //Product: selectItem(ownProps.match.params.id)(state)
});





export default connect(mapStateToProps)(ProductPage);

 