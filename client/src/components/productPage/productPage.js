import React ,{Component} from 'react'
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
        
      }


      render(){
        console.log(this.props.match.params.id);
       console.log("IMGURL"+this.props.Item);

        return(
<div className="productPage">
<div className="Header-productPage"><Header /></div>


<div className="container-productPage">
    <div className="PicComponent">
   <PicComponent imgURL={this.props.Item.imageUrl}/>
   </div>
   <div className="MiddleComponent">
   <MiddleComponent name={this.props.Item.name} price={this.props.Item.price} item={this.props.Item} />
   </div>
   <div className="DiscComponent">
   <DiscComponent />
   </div>

   </div>
</div>

        );
      }
 }

 const mapStateToProps = (state, ownProps) => ({
  /*ItemProduct: state.ProductsReducer.products.find((col)=>{

    return col.id ===1
  })*/
  
  Item: state.ProductsReducer.products.flatMap((col)=>  col.items).find((item)=> item.id ==  ownProps.match.params.id )
 //Product: selectItem(ownProps.match.params.id)(state)
});





export default connect(mapStateToProps)(ProductPage);

 