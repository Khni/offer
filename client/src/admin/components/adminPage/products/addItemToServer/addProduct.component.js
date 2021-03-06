import React, { Component } from 'react'
import { selectAdminAuth } from '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { compose } from 'redux';
import './addProduct.scss'
import FormData from 'form-data'
import InputForm from '../../../../../components/form/inputForm'
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
    // this.setState({ addingToServer: true })

    let formData_FormData = new FormData()
    //append all form data to formData 
    for (var key in formData) {

      formData_FormData.append(key, formData[key])

    }
    //append photo files to formData
    const files = this.state.selectedFiles
    for (let i = 0; i < files.length; i++) {
      formData_FormData.append(`photos`, files[i])
    }

    // formData_FormData.append("onlyOrderAvailableQty", false)



    for (var pair of formData_FormData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }


    const { addProductToServer } = this.props;

    await addProductToServer(formData_FormData, this.props.AdminToken)

    if (this.props.AddedToServer) {

      this.setState({ addingToServer: false })

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
    const onlyOrderAvailableQty = [
      {
        option: "Yes, limited order ",
        value: true

      },
      {
        option: "No, unlimited order  ",
        value: false
      }
    ]
    const sections = this.props.sections.map(section => {
      return { value: section._id, option: section.nameEn }
    })

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
                classN="input-300"
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
                classN="input-300"
                //       placeholder='enter title in English ' 
                component={InputForm}
                label='Title in English'
              />
            </fieldset>

            <fieldset>
              <Field
                type='Number'
                name='price'
                id='price'
                classN="input-100"
                //       placeholder='enter title in English ' 
                component={InputForm}
                label='price'
              />
            </fieldset>


            <fieldset>
              <Field
                type='Number'
                name='quantity'
                id='quantity'
                classN="input-100"
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
                classN="input-300"
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
                classN="input-300"
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
                className='sectionID'
                //      placeholder='enter title in English ' 
                component={InputFile}
                change={this.onChangeHandler}
                label='Upload product Photos'
              />
            </fieldset>
            <h3>Discount</h3>



            <fieldset>
              <Field
                type='number'
                name='defaultDiscountValue'
                id='defaultDiscountValue'
                classN="input-100"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='default Discount Value'
              />
            </fieldset>
            <fieldset>
              <Field
                type='number'
                name='discountValue'
                id='discountValue'
                classN="input-100"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='Offer Discount Value'
              />
            </fieldset>

            <fieldset>
              <Field
                type='date'
                name='discountStartsAt'
                id='discountStartsAt'
                classN="input-300"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='discount Starts At  '
              />
            </fieldset>


            <fieldset>
              <Field
                type='date'
                name='discountExpAt'
                id='discountExpAt'
                classN="input-300"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='discount Exp At'
              />
            </fieldset>





            <fieldset>
              <Field

                options={[{ option: 'in Percentage', value: true },
                { option: 'in Currency', value: false }]}
                name='inPercentage'
                id='inPercentage'
                classN="input-300"
                //      placeholder='enter title in English ' 
                component={SelectForm}
                label=' Discount Type '
              />
            </fieldset>


            <fieldset>
              <Field
                type='number'
                name='limitedOrder'
                id='limitedOrder'
                classN="input-100"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='Maximum to order'
              />
            </fieldset>

            <fieldset>
              <Field
                type='text'
                name='barcode'
                id='barcode'
                classN="input-300"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='barcode'
              />
            </fieldset>

            <fieldset>
              <Field
                type='text'
                name='barcodeType'
                id='barcodeType'
                classN="input-100"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='barcode type'
              />
            </fieldset>

            <fieldset>
              <Field
                type='text'
                name='sku'
                id='sku'
                classN="input-300"
                //    placeholder='enter title in Arabic' 
                component={InputForm}
                label='sku'
              />
            </fieldset>



            <fieldset>
              <Field

                options={onlyOrderAvailableQty}
                name='onlyOrderAvailableQty'
                id='onlyOrderAvailableQtya'
                classN="input-100"
                //      placeholder='enter title in English ' 
                component={SelectForm}
                label=' order only if there is enough stock? '
              />
            </fieldset>



            <fieldset>
              <Field

                options={sections}
                name='sectionID'
                id='sectionID'
                classN="input-100"
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