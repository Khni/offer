import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions';
import * as calls from '../store/actions/axiosCalls'
class AuthCheck extends Component {
	
	constructor(props) {
    super(props);
    
    this.state = {
      
    }
  }
  
  componentDidMount async(){
  	try{
    const res = await calls.postDataHeaderAuth('/api/user/refreshToken', { token: this.props.token}, RefreshToken)
    if(res.status== 201) {
this.props.refreshToken(res.data.token, res.data.refreshToken)
   } 
   } catch(e) {
this.props.logout()
} 
  }

  render() {
    return this.props.children
  }
}



const mapDispatchToProps = dispatch => ({
 // addItem: item => dispatch(actions.addItem(item)),
  //addItemToCartItem: (item, items) => dispatch(actions.addItemToCartItem(item, items)),
  logout: () => dispatch(actions.logout()),
  favoriteListAction: (token,refreshToken) => dispatch(actions.fetchFavorites(token,refreshToken)),
  refreshToken: (token, refreshToken) => dispatch(actions.refreshToken(token,refreshToken)),
});

const mapStateToProps = (state) => {
  return {
    
    token: state.userAuth.authUser.token,
    RefreshToken: state.userAuth.authUser.refreshToken,
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);


