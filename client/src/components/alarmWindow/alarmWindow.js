import React, {useState} from 'react';

import './alarmWindow.scss';
import { connect } from 'react-redux';
import {toggleHintBox} from '../../store/actions';
import Backdrop from '../backdrop/backdropComponent'
import { withRouter } from 'react-router-dom';

const HintBox = (props) =>{

  const [window, showWindow] =useState(props.showAlarmWindow)
	let alarmWindow = "alarmWindow" ;
  if (window) {
alarmWindow = "alarmWindow show" ;
} 


 return (
 <div>
 < Backdrop show={props.showAlarmWindow} />
<p className={alarmWindow} >
gg
</p>
</div>
);

} 

function mapStateToProps(state)  {
  return {
    hidden: state.hintBoxReducer.hidden, 
    msg: state.hintBoxReducer.msg, 
    showAlarmWindow: state.hintBoxReducer.showAlarmWindow, 
    
    
  };
}
const mapDispatchToProps = dispatch => ({
  toggleHintBox: (msg) => dispatch(toggleHintBox(msg))
});

 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HintBox));