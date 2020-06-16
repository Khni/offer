import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectUserAuth} from '../../../store/reducers/auth/userReselect';
export default (AuthComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (this.props.auth.isAuthenticated && this.props.auth.token) {
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
      auth: selectUserAuth(state) 
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};