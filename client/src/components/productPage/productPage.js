import React ,{Component} from 'react'
import PicComponent from './pic/pic.component'
import MiddleComponent from './middle/middle.component'
import DiscComponent from './disc/disc.component'
import {connect} from 'react-redux'
import {selectItem} from '../../store/reducers/products/productsReselect'
import Style from './ProductPage.scss'

 class ProductPage extends Component {
    constructor(props) {
        super(props);
        
      }


      render(){
        console.log(this.props.match.params.title);
        console.log("IMGURL"+this.props.Product.imgURL);

        return(
<div className="productPage">
    <div className="PicComponent">
   <PicComponent imgURL={this.props.Product.imgURL}/>
   </div>
   <div className="MiddleComponent">
   <MiddleComponent />
   </div>
   <div className="DiscComponent">
   <DiscComponent />
   </div>
</div>

        );
      }
 }

 const mapStateToProps = (state, ownProps) => ({
 Product: selectItem(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(ProductPage);

 