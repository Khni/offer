import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import AddcategoryStyle from './addCategoryStyle.scss'
import InputForm from '../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../components/form/selectOptions.component' 
import * as actions from '../../../../store/actions/product';

///import Category from '../../../../../../server/src/models/Category';




class AddCategory extends Component {

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
const { addCategoryToServer } = this.props;
console.log("form data: " + JSON.stringify(formData) )
   await addCategoryToServer(formData,AdminToken)
   if (this.props.AddedToServer) {
    this.setState({addingToServer: false})
     //alert("Item has been added!") 
  window.location.reload();
    }
  
  }

async componentDidMount() {

  
  console.log("log from add category" )

  }
  async componentDidUpdate() {
    
    console.log("log from add category Update" )
   }





    render() {
const { handleSubmit } = this.props;

        return(
<div className="addCategory">
       <h4 class="form-title"> Add New Category </h4>

      
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
  
  	//categories : state.categoryReducer.categories, 
//  sections: state.categoryReducer.sections, 
 //   Name: selectAdminAuth(state).Name,
  //  Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AddCategory' })
)(AddCategory)