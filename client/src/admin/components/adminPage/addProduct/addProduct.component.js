import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import AddproductStyle from './addProduct.scss'
import InputForm from '../../../../components/form/inputForm.js' 
import * as actions from '../../../../store/actions/product';




class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

async onSubmit(formData) {


   
   
  
  }

async componentDidMount() {

  const { fetchCategories } = this.props;
  await fetchCategories();

  }
  async componentDidUpdate() {
    const { fetchCategories } = this.props;
    await fetchCategories();
   }





    render() {
const { handleSubmit } = this.props;

        return(
<div className="addProduct">
       <h4 class="form-title"> Add New Product </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
                 
             <fieldset>
              <Field
                type='text' 
                name='title_ar' 
                id='title_ar' 
                className='title_ar'
                placeholder='enter title in Arabic' 
                component={InputForm}
                label='enter title in Arabic' 
              />
            </fieldset>
               <fieldset>
              <Field
                type='text' 
                name='title_en' 
                id='title_en' 
                className='title_en'
                placeholder='enter title in English ' 
                component={InputForm}
                label='enter title in English' 
              />
            </fieldset>
                       <fieldset>
              <Field
                type='text' 
                name='title_ar' 
                id='title_ar' 
                className='title_ar'
                placeholder='enter title in Arabic' 
                component={InputForm}
                label='enter title in Arabic' 
              />
            </fieldset>
            
            <select name="category" id="category">
 
 <option value="volvo">Volvo</option>

</select>



            




            <button type="submit" class="custum-btn-form">{this.props.submitBtnTitle}</button>
            
          </form>
</div>


         /*   <div>admin PAGE
<h3> welcome {this.props.Name} </h3>
<h4>{this.props.Email} </h4>
</div>*/
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



export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AddProduct' })
)(AddProduct)