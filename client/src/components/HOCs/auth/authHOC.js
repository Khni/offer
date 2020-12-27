import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {selectUserAuth} from '../../../store/reducers/auth/userReselect'

export default (AuthComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token ) {
	
        this.props.history.push('/');
        
      }
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <AuthComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      errorMsg: state.userAuth.authUser.error, 
       
      token: state.userAuth.authUser.token,
      isAuthenticated: state.userAuth.authUser.isAuthenticated, 
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};