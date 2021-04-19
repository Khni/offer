import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';

import './addProduct.scss'
import FormData from 'form-data'

import * as actions from '../../../../../store/actions/product';
//import ProductsList from './productsList.component'





class AddProduct extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          addingToServer: false,
          selectedFile: null
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this)
        
    }
    

async onSubmit(formData) {
  formData.preventDefault()
  console.log(formData.target.nameEn.value);
  this.setState({addingToServer: true})
 // formData.append('file', this.state.selectedFile)
 let data = new FormData()
 //let FormDataObj = new FormData(formData)
 data.append("nameAr", "sas")
 data.append("nameEn", "apend")
 data.append("descEn"	, "ddddd")
 data.append("descAr"	, "ddddd")
 data.append('upload', formData.upload )
 data.append("nameAr", "sas")
 data.append("price", 45 )
 data.append("quantity", 45 )
 data.append("sectionID", "5f6681eea6cac600174014a3")
  // console.log(data.name + 'dataapend');
//const filen = this.state.selectedFile
  // console.log(this.state.selectedFile.name  + 'filen');
  // console.log("formOBJ", JSON.stringify(FormDataObj));
  //formData['file'] = this.state.selectedFile
const AdminToken = this.props.AdminToken
let AddetToServerCond = this.props.AddedToServer
console.log("form Data price" + data.get('price'));

//console.log("form name" + formData.upload.name );
const { addProductToServer } = this.props;
console.log("apend data: " + JSON.stringify(data)  )

console.log("isAdding After setting True///" +this.state.addingProduct );
 //await addProductToServer(data,AdminToken)
 //  this.setState({addingToServer: false})
   console.log("isAdding After setting false///" +this.state.addingProduct );
   //console.log(formData);
  //  let AddetToServerCondafter = this.props.AddedToServer
  //  console.log("added cond after submit" +AddetToServerCondafter);
   
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
  
onChangeHandler=(event)=>{
  this.setState({
    selectedFile: event.target.files[0],
   
  })
  console.log('state' + this.state.selectedFile)

}
async componentDidMount() {
  
await this.FetchSectionsFromServer()
  //const { fetchSections } = this.props;
  //const { fetchProducts } = this.props;
  //await fetchSections();
  //await fetchProducts();
  console.log("log from add product mound" )

  }
  async componentDidUpdate(prevState) {
  await this.FetchSectionsFromServer()
    //const { fetchSections } = this.props;
 // const { fetchProducts } = this.props;
  //await fetchSections();
 // await fetchProducts();
    console.log("log from add product Update" )
   }





    render() {


        return(
<div className="addProduct-container">
















<div className="addProductToServer">
       

      
          <form enctype="multipart/form-data" onSubmit={this.onSubmit}>
          <h4 class="form-title"> Add New Product </h4>
       
              <input
                type='text' 
                name='nameAr' 
                id='nameAr' 
                className='nameAr'
            //    placeholder='enter title in Arabic' 
              
                label='Title in Arabic' 
              />
     
              <input
                type='text' 
                name='nameEn' 
                id='nameEn' 
                className='nameEn'
         //       placeholder='enter title in English ' 
             
                label='Title in English' 
              />
       
              <input
                type='text' 
                name='price' 
                id='price' 
                className='price'
         //       placeholder='enter title in English ' 
               
                label='price' 
              />
         
              <input
                type='text' 
                name='quantity' 
                id='quantity' 
                className='quantity'
             //   placeholder='enter title in Arabic' 
             
                label='Quantity ' 
              />
           
            
              
            
              <input
                type='text' 
                name='descAr' 
                id='descAr' 
                className='descAr'
          //      placeholder='enter title in English ' 
            
                label=' description in Arabic' 
              />
         
            
              <input
                type='text' 
                name='descEn' 
                id='descEn' 
                className='descEn'
          //      placeholder='enter title in English ' 
          
                label=' Description in English' 
              />
    
            
            
           
              <input
                type='file' 
                name='upload' 
                id='upload' 
                className='imgURL'
          //      placeholder='enter title in English ' 
              
//change={this.onChangeHandler}
                label='Pic' 
              />
           
            

            <input
                
                sections={this.props.sections}
                name='sectionID' 
                id='sectionID' 
                className='sectionID'
          //      placeholder='enter title in English ' 
            
                label=' section' 
              />
             
               


            
                


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



export default  connect(mapStateToProps, actions)(AddProduct)