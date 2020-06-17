import React ,{Component} from 'react'
import PicComponent from './pic/pic.component'
import MiddleComponent from './middle/middle.component'
import DiscComponent from './disc/disc.component'
import Style from './ProductPage.scss'

 class ProductPage extends Component {
    constructor(props) {
        super(props);
        
      }

      render(){


        return(
<div className="productPage">
    <div className="PicComponent">
   <PicComponent />
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


 export default ProductPage