import React from 'react';

import './alarmWindow.scss';
import { connect } from 'react-redux';
import {toggleHintBox} from '../../store/actions';

import { withRouter } from 'react-router-dom';

const HintBox = (props) =>{
	let alarmWindow = "alarmWindow" ;
  if (props.show) {
alarmWindow = "alarmWindow show" ;
} 

 return (
 <div>
 < Backdrop show={props.show} />
<p className={alarmWindow} >

</p>
</div>
);

} 

function mapStateToProps(state)  {
  return {
    hidden: state.hintBoxReducer.hidden, 
    msg: state.hintBoxReducer.msg, 
    
    
  };
}
const mapDispatchToProps = dispatch => ({
  toggleHintBox: (msg) => dispatch(toggleHintBox(msg))
});

 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HintBox));