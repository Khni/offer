import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import AddproductStyle from './addProduct.scss'
import InputForm from '../../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../../components/form/selectOptions.component' 
import * as actions from '../../../../../store/actions/product';
//import ProductsList from './productsList.component'





class AddProduct extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          addingToServer: false
        }
        this.onSubmit = this.onSubmit.bind(this);

        
    }
    

async onSubmit(formData) {
	this.setState({addingToServer: true})
const AdminToken = this.props.AdminToken
let AddetToServerCond = this.props.AddedToServer
console.log("added cond before submit" +AddetToServerCond);

const { addProductToServer } = this.props;
//console.log("form data: "  )

console.log("isAdding After setting True///" +this.state.addingProduct );
   await addProductToServer(formData,AdminToken)
 //  this.setState({addingToServer: false})
   console.log("isAdding After setting false///" +this.state.addingProduct );
   //console.log(formData);
   let AddetToServerCondafter = this.props.AddedToServer
   console.log("added cond after submit" +AddetToServerCondafter);
   
   if (this.props.AddedToServer) {
   	
    this.setState({addingToServer: false})
     //alert("Item has been added!") 
  window.location.reload();
    }
  
  }
  
  
  async FetchSectionsFromServer() {
if(!this.props.sectionsFetched) {
  
  const { fetchSections } = this.props;
  await fetchSections();
  console.log("log from add product UpdatefetchSectction" )
  }
} 
  

async componentDidMount() {
await this.FetchSectionsFromServer()
  //const { fetchSections } = this.props;
  //const { fetchProducts } = this.props;
  //await fetchSections();
  //await fetchProducts();
  console.log("log from add product mound" )

  }
  async componentDidUpdate() {
  await this.FetchSectionsFromServer()
    //const { fetchSections } = this.props;
 // const { fetchProducts } = this.props;
  //await fetchSections();
 // await fetchProducts();
    console.log("log from add product Update" )
   }





    render() {
const { handleSubmit } = this.props;

        return(
<div className="addProduct-container">
















<div className="addProductToServer">
       

      
          <form onSubmit={handleSubmit(this.onSubmit)}>
          <h4 class="form-title"> Add New Product </h4>
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
                label='price' 
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
               


            
                


             {!this.state.addingToServer? <button type="submit" class="custum-btn-form">  
                      submit</button> :null }
             {this.state.addingToServer ? <div className="loadingBtnDiv"><div className="loaderbTn"/></div> : null }

            
          </form>
          </div>




     




     
     
</div>


         
        )
    }
}

const mapStateToProps = state => {
  return {
   sectionsFetched : state.categoryReducer.sectionsFetched, 
  sections: state.categoryReducer.sections, 
  AdminToken: selectAdminAuth(state).token,
  AddedToServer : state.categoryReducer.AddToServer.added,
  addingProduct: state.categoryReducer.addingProduct, 
  
 // products: state.categoryReducer.products
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AddProduct' })
)(AddProduct)