import Style from './AddAddressForm.scss';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
//import { selectAuthLang, selectLang} from '../../../store/reducers/langReducer/langReselect';
import * as actions from '../../../../../../store/actions/users';

import { Link } from 'react-router-dom';

import InputForm from "../../../../../form/inputForm"
class AddAddress extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);


  }


  async onSubmit(formData) {

    console.log("data" + JSON.stringify(formData));
    const { AddNewAddress } = this.props;
    // let lang = this.props.lang
    // console.log(lang)
    await AddNewAddress(formData, this.props.token);
    //  this.props.history.push('/account/settings/address');
    // if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token ) {

    //   this.props.history.push('/');

    // }
  }










  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container-signup">
        <div class="form-container-form">
          <h3>Add New Address Details</h3>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <table>
              <tr>
                <td><fieldset>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    classN="halfInput"
                    placeholder="First Name"
                    component={InputForm}
                    label="First Name "
                  />
                </fieldset></td>
                <td><fieldset>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    component={InputForm}
                    label="Last Name  "
                  />
                </fieldset></td>
              </tr>






            </table>
            <table>
         <tr>
           <td>
              <fieldset>
                <Field
                  type="tel"
                  name="phone"
                  id="phone"
                  classN="fullInput"
                  placeholder="phone"
                  component={InputForm}
                  label="Phone  "
                />
              </fieldset>
              </td>
            
              <td>
              <fieldset>
                <Field
                  type="text"
                  name="city"
                  id="city"
                  classN="fullInput"
                  placeholder="City"
                  component={InputForm}
                  label="City  "
                />
              </fieldset>
              </td>
            </tr>
            </table>
            <div>

              <fieldset>
                <Field
                  type="text"
                  name="street"
                  id="street"
                  classN="fullInput"
                  placeholder="street"
                  component={InputForm}
                  label="Street  "
                />
              </fieldset>

            </div>





            <table>
              <tr>
                <td><fieldset>
                  <Field
                    type="number"
                    name="appartment"
                    id="appartment"
                    classN="halfInput"
                    placeholder="appartment number"
                    component={InputForm}
                    label="appartment "
                  />
                </fieldset></td>
                <td><fieldset>
                  <Field
                    type="number"
                    name="floor"
                    id="floor"
                    classN="halfInput"
                    placeholder="floor"
                    component={InputForm}
                    label="floor  "
                  />
                </fieldset></td>
              </tr>






            </table>
            <button type="submit" class="custum-btn-form">submit</button>
          </form>
        </div>
      </div>



    );
  }
}

const mapStateToProps = state => {
  return {
    // errorMsg: state.userAuth.authUser.error, 
    // name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    // isAuthenticated: state.userAuth.authUser.isAuthenticated, 
    // submit_signin_btn: selectAuthLang(state).submit_signin_btn,
    // signin_title: selectAuthLang(state).signin_title,
    // emailString: selectAuthLang(state).email,
    // passwordString: selectAuthLang(state).password,
    // nameString: selectAuthLang(state).name,
    // repasswordString: selectAuthLang(state).repassword,
    // phoneString: selectAuthLang(state).phone,
    // classN: selectAuthLang(state).classN,
    // //lang: selectLang(state)
    // lang: state.langReducer.lang
  }

}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AddAddress' })
)(AddAddress)