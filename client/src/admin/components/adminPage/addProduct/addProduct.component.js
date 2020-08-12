import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import AddproductStyle from './addProduct.scss'
import InputForm from '../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../components/form/selectOptions.component' 
import * as actions from '../../../../store/actions/product';
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
///import Category from '../../../../../../server/src/models/Category';




class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

async onSubmit(formData) {
const AdminToken = this.props.AdminToken
const { addProductToServer } = this.props;
console.log("form data: " + JSON.stringify(formData) )
   addProductToServer(formData,AdminToken)
   
  
  }

async componentDidMount() {

  const { fetchSections } = this.props;
  await fetchSections();
  console.log("log from add product mound" +this.props.sections)

  }
  async componentDidUpdate() {
    const { fetchSections } = this.props;
    await fetchSections();
    console.log("log from add product Update" +this.props.sections)
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
                name='nameAr' 
                id='nameAr' 
                className='nameAr'
            //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='Title in Arabic' 
              />
            </fieldset>
               <fieldset>
              <Field
                type='text' 
                name='nameEn' 
                id='nameEn' 
                className='nameEn'
         //       placeholder='enter title in English ' 
                component={InputForm}
                label='Title in English' 
              />
            </fieldset>
            
                    <fieldset>
              <Field
                type='text' 
                name='price' 
                id='price' 
                className='price'
         //       placeholder='enter title in English ' 
                component={InputForm}
                label='Title in English' 
              />
            </fieldset>
            
            
                       <fieldset>
              <Field
                type='text' 
                name='quantity' 
                id='quantity' 
                className='quantity'
             //   placeholder='enter title in Arabic' 
                component={InputForm}
                label='Quantity ' 
              />
            </fieldset>
            
              
               <fieldset>
              <Field
                type='text' 
                name='descAr' 
                id='descAr' 
                className='descAr'
          //      placeholder='enter title in English ' 
                component={InputForm}
                label=' description in Arabic' 
              />
                </fieldset>
               <fieldset>
              <Field
                type='text' 
                name='descEn' 
                id='descEn' 
                className='descEn'
          //      placeholder='enter title in English ' 
                component={InputForm}
                label=' Description in English' 
              />
            </fieldset>
            <fieldset>
            <Field
                
                sections={this.props.sections}
                name='sectionID' 
                id='sectionID' 
                className='sectionID'
          //      placeholder='enter title in English ' 
                component={SelectForm}
                label=' section' 
              />
                </fieldset>
               


            




            <button type="submit" class="custum-btn-form">submit</button>
            
          </form>
</div>


         
        )
    }
}

const mapStateToProps = state => {
  return {
  	categories : state.categoryReducer.categories, 
  sections: state.categoryReducer.sections, 
  AdminToken: selectAdminAuth(state).token,
    Name: selectAdminAuth(state).Name,
    Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AddProduct' })
)(AddProduct)