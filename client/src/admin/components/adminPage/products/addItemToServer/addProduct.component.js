import React, { Component } from 'react'
import { selectAdminAuth } from '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { compose } from 'redux';
import './addProduct.scss'
import FormData from 'form-data'
import InputForm from '../../../../../components/form/inputAdminForm'
import InputFile from '../../../../../components/form/inputFileAdmin'
import SelectForm from '../../../../../components/form/selectOptions.component'
import * as actions from '../../../../../store/actions/product';
//import ProductsList from './productsList.component'





class AddProduct extends Component {

  constructor(props) {
    super(props)

    this.state = {
      addingToServer: false,
      selectedFile: null,
      selectedFiles: []
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this)

  }


  async onSubmit(formData) {
    this.setState({ addingToServer: true })
    // formData.append('file', this.state.selectedFile)
    let data = new FormData()
    let formData_FormData = new FormData()
    //let FormDataObj = new FormData(formData)
    for (var key in formData) {
     
        formData_FormData.append(key, formData[key])
      

    }

    const files = this.state.selectedFiles
    for (let i = 0; i < files.length; i++) {
      formData_FormData.append(`photos`, files[i])
  }

   

    
    /*formData_FormData.append("photos", formData_FormData.get('pic1'))
    formData_FormData.append("photos",  formData_FormData.get('pic2'))*/

    formData_FormData.append("onlyOrderAvailableQty", false)


    // formData_FormData.forEach(file => {
    //   formData_FormData.append("photos[]", file.upload, file.pic2)
    // })

    for (var pair of formData_FormData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log('stateNewSubmit' + this.state.selectedFiles)


    console.log("formdata keys" + formData_FormData.get('upload'));


    data.append("nameAr", "sas")
    data.append("nameEn", "apend")
    data.append("descEn", "ddddd")
    data.append("descAr", "ddddd")
    data.append('upload', formData.upload)
    data.append("nameAr", "sas")
    data.append("price", 45)
    data.append("quantity", 45)
    data.append("sectionID", "5f6681eea6cac600174014a3")
    // console.log(data.name + 'dataapend');
    //const filen = this.state.selectedFile
    // console.log(this.state.selectedFile.name  + 'filen');
    // console.log("formOBJ", JSON.stringify(FormDataObj));
    //formData['file'] = this.state.selectedFile
    const AdminToken = this.props.AdminToken

    console.log("form Data apeend" + data.nameEn);

    //console.log("form name" + formData.upload.name );
    const { addProductToServer } = this.props;
    console.log("apend data: " + JSON.stringify(data))
    //formData_FormData.append("photos", this.state.selectedFiles)


    console.log("isAdding After setting True///" + this.state.addingProduct);
    await addProductToServer(formData_FormData, AdminToken)
    //  this.setState({addingToServer: false})
    console.log("isAdding After setting false///" + this.state.addingProduct);
    //console.log(formData);
    let AddetToServerCondafter = this.props.AddedToServer
    console.log("added cond after submit" + AddetToServerCondafter);

    if (this.props.AddedToServer) {

      this.setState({ addingToServer: false })
      //alert("Item has been added!") 
      window.location.reload();
    }

  }


  async FetchSectionsFromServer() {
    if (!this.props.sectionsFetched) {

      const { fetchSections } = this.props;
      await fetchSections();
      console.log("log from add product UpdatefetchSectction")
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      selectedFiles: event.target.files
    })
    console.log('stateNew' + this.state.selectedFiles)

  }
  async componentDidMount() {

    await this.FetchSectionsFromServer()
    //const { fetchSections } = this.props;
    //const { fetchProducts } = this.props;
    //await fetchSections();
    //await fetchProducts();
    console.log("log from add product mound")

  }
  async componentDidUpdate(prevState) {
    await this.FetchSectionsFromServer()
    //const { fetchSections } = this.props;
    // const { fetchProducts } = this.props;
    //await fetchSections();
    // await fetchProducts();
    console.log("log from add product Update")
  }





  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="addProduct-container">
















        <div className="addProductToServer">



          <form enctype="multipart/form-data" onSubmit={handleSubmit(this.onSubmit)}>
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
                type='file'
                name='photos'
                id='photos'
                className='imgURL'
                //      placeholder='enter title in English ' 
                component={InputFile}
                change={this.onChangeHandler}
                label='Pic'
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







            {!this.state.addingToServer ? <button type="submit" class="custum-btn-form">
              submit</button> : null}
            {this.state.addingToServer ? <div className="loadingBtnDiv"><div className="loaderbTn" /></div> : null}


          </form>
        </div>











      </div>



    )
  }
}

const mapStateToProps = state => {
  return {
    sectionsFetched: state.categoryReducer.sectionsFetched,
    sections: state.categoryReducer.sections,
    AdminToken: selectAdminAuth(state).token,
    AddedToServer: state.categoryReducer.AddToServer.added,
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