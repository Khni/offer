import React, {useState} from 'react';

import './alarmWindow.scss';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Backdrop from '../backdrop/backdropComponent'
import { withRouter } from 'react-router-dom';
import { ReactComponent as View } from '../../icons/src/action/check_circle/materialicons/24px.svg';

const HintBox = (props) =>{

  const [window, ShowWindow] =useState(props.showAlarmWindow)
	let alarmWindow = "alarmWindow" ;
  if (props.showAlarmWindow) {
alarmWindow = "alarmWindow show" ;
} 


 return (
 <div>
 < Backdrop show={props.showAlarmWindow} clickHandler={props.hideAlarmWindowAction}/>
<div className={alarmWindow} >

  <div className="avatar-sidebar">{props.done? <View /> : <View />}</div>
<p>{props.windowTitle}</p> 
<div  className="flex-row centerdiv centerflex paddingBottom20  ">

 {props.btns.map((btn) =><button onClick={()=>{btn.onClick()
 props.hideAlarmWindowAction() } } className="custum-btn-form">{btn.label}</button> )}

</div>
</div>

</div>
);

} 

function mapStateToProps(state)  {
  return {
    hidden: state.hintBoxReducer.hidden, 
    msg: state.hintBoxReducer.msg, 
    showAlarmWindow: state.hintBoxReducer.alarmWindow.show, 
    btns: state.hintBoxReducer.alarmWindow.btns, 
    windowTitle: state.hintBoxReducer.alarmWindow.title, 
    
    
    
  };
}
const mapDispatchToProps = dispatch => ({
  
  hideAlarmWindowAction: () => dispatch(actions.hideAlarmWindowAction()),
});

 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HintBox));