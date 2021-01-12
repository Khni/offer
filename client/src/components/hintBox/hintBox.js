import React from 'react';
import Trashicon from './img/trash.png';
import Plusicon from './img/add.png';
import Minusicon from './img/minus.png';

import './cart-dropdown.styles.css';
import { connect } from 'react-redux';
import {toggleHintBox} from '../../store/actions';
import {selectCartItems} from  '../../store/reducers/cart/cartReselect';
import { withRouter } from 'react-router-dom';

const HintBox = (props) =>{
	let hintBoxClass = "hintBox" ;
  if (!props.hidden) {
hintBox = "hintBox show" ;
} 

 return (
<div className={hintBoxClass} >
{props.msg}
</div>
);

} 

function mapStateToProps(state)  {
  return {
    hidden: state.hintBoxReducer.hidden, 
    msg: state.hintBoxReducer.msg
  };
}
const mapDispatchToProps = dispatch => ({
  toggleHintBox: (msg) => dispatch(toggleHintBox(msg))
});

 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HintBox));