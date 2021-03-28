import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { compose } from 'redux';
import  './addSectionStyle.scss'
import InputForm from '../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../components/form/selectOptions.component' 
import * as actions from '../../../../store/actions/product';
///import Category from '../../../../../../server/src/models/Category';




class AddSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
          addingToServer: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

async onSubmit(formData) {
this.setState({addingToServer: true})
console.log("form data: " + JSON.stringify(formData) )
   const AdminToken = this.props.AdminToken
const { addSectionToServer } = this.props;
console.log("form data: " + JSON.stringify(formData) )
   await addSectionToServer(formData,AdminToken)
   if (this.props.AddedToServer) {
    this.setState({addingToServer: false})
     //alert("Item has been added!") 
  window.location.reload();
    }
  
  }

async componentDidMount() {

  const { fetchCategories } = this.props;
  await fetchCategories();
  console.log("log from add section mound" +this.props.categories)

  }
  async componentDidUpdate() {
    const { fetchCategories } = this.props;
    await fetchCategories();
    console.log("log from add section Update" +this.props.categories)
   }





    render() {
      const categories = this.props.categories.map(category => {
        return { value: category._id, option: category.nameEn }
      })
const { handleSubmit } = this.props;

        return(
<div className="addSection">
       <h4 class="form-title"> Add New Section </h4>

      
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
                
                options={categories}
                name='categoryID' 
                id='categoryID' 
                className='categoryID'
          //      placeholder='enter title in English ' 
                component={SelectForm}
                label='category' 
              />
                </fieldset>
               


            




            {!this.state.addingToServer? <button type="submit" class="custum-btn-form">  
                      submit</button> :null }
             {this.state.addingToServer ? <div className="loadingBtnDiv"><div className="loaderbTn"/></div> : null }
          </form>
</div>


         
        )
    }
}

const mapStateToProps = state => {
  return {
  	AdminToken: selectAdminAuth(state).token,
  AddedToServer : state.categoryReducer.AddToServer.added,
  	categories : state.categoryReducer.categories
  //sections: state.categoryReducer.sections, 
 //   Name: selectAdminAuth(state).Name,
 //   Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AddSection' })
)(AddSection)