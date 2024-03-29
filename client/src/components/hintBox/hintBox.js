import React from 'react';

import './hintBox.scss';
import { connect } from 'react-redux';
import {toggleHintBox} from '../../store/actions';

import { withRouter } from 'react-router-dom';

const HintBox = (props) =>{
	let hintBoxClass = "hintBox" ;
  if (!props.hidden) {
hintBoxClass = "hintBox show" ;
} 

 return (
<p className={hintBoxClass} >
{props.msg}
</p>
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