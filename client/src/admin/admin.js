import React, {Component} from 'react'
import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { connect } from 'react-redux';
class AdminPage extends Component {

    constructor(props) {
        super(props)
    }


    render() {


        return(
            <div>admin PAGE
<h3> welcome {this.props.Name} </h3>
<h4>{this.props.Email} </h4>
</div>
        )
    }
}

const mapStateToProps = state => {
  return {
    Name: selectAdminAuth(state).Name,
    Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}

export default connect(mapStateToProps)(AdminPage);
