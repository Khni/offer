import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectUserAuth} from '../../../store/reducers/auth/userReselect'

export default (AuthComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (this.props.isAuth && this.props.jwtToken) {
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
      isAuth: state.userAuth.isAuthenticated,
      jwtToken:state.userAuth.token
      /*isAuth: selectUserAuth(state).isAuthenticated,
      jwtToken: selectUserAuth(state).token*/
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};