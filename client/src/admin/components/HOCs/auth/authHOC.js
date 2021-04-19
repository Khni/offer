import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectAdminAuth} from '../../../../store/reducers/admin/auth/adminReselect'

export default (AuthComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (!this.props.isAuth && !this.props.jwtToken) {
        this.props.history.push('/admin-login');
      }
    }

    componentDidMount() {
     this.checkAuth()
    }

    componentDidUpdate() {
      this.checkAuth()
    }

    render() {
      /*
Error: Maximum update depth exceeded. 
This can happen when a component repeatedly calls setState 
inside componentWillUpdate or componentDidUpdate.
 React limits the number of nested updates to prevent infinite loops.
      */
      return <AuthComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: selectAdminAuth(state).isAuthenticated,
      jwtToken:selectAdminAuth(state).token
      /*isAuth: selectUserAuth(state).isAuthenticated,
      jwtToken: selectUserAuth(state).token*/
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};