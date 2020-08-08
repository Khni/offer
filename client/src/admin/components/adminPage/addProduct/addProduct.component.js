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
///import Category from '../../../../../../server/src/models/Category';




class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

async onSubmit(formData) {

console.log("form data: " + JSON.stringify(formData) )
   
   
  
  }

async componentDidMount() {

  const { fetchCategories } = this.props;
  await fetchCategories();
  console.log("log from add product mound" +this.props.categories)

  }
  async componentDidUpdate() {
    const { fetchCategories } = this.props;
    await fetchCategories();
    console.log("log from add product Update" +this.props.categories)
   }





    render() {
const { handleSubmit } = this.props;

        return(
<div className="addProduct">
       <h4 class="form-title"> Add New Product </h4>

       <div>
         {this.props.categories.map((c)=> {

         return <p>{c.name}</p>
         })}
       </div>
          <form onSubmit={handleSubmit(this.onSubmit)}>
                 
             <fieldset>
              <Field
                type='text' 
                name='title_ar' 
                id='title_ar' 
                className='title_ar'
            //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='Title in Arabic' 
              />
            </fieldset>
               <fieldset>
              <Field
                type='text' 
                name='title_en' 
                id='title_en' 
                className='title_en'
         //       placeholder='enter title in English ' 
                component={InputForm}
                label='Title in English' 
              />
            </fieldset>
                       <fieldset>
              <Field
                type='text' 
                name='Quantity' 
                id='Quantity' 
                className='Quantityr'
             //   placeholder='enter title in Arabic' 
                component={InputForm}
                label='Quantity ' 
              />
            </fieldset>
            
              
               <fieldset>
              <Field
                type='text' 
                name='desc_ar' 
                id='desc_ar' 
                className='desc_ar'
          //      placeholder='enter title in English ' 
                component={InputForm}
                label=' description in Arabic' 
              />
                </fieldset>
               <fieldset>
              <Field
                type='text' 
                name='desc_en' 
                id='desc_en' 
                className='desc_en'
          //      placeholder='enter title in English ' 
                component={InputForm}
                label=' Description in English' 
              />
            </fieldset>
            <fieldset>
            <Field
                type='text' 
                categories={this.props.categories}
                name='categoris' 
                id='categoris' 
                className='categoris'
          //      placeholder='enter title in English ' 
                component={SelectForm}
                label=' categoris' 
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
    Name: selectAdminAuth(state).Name,
    Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AddProduct' })
)(AddProduct)