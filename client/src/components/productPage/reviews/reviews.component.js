import ReactStars from "react-rating-stars-component";
import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import './middle.scss'
import InputForm from '../../form/TextAreaForm.js';
import StarRatings from 'react-star-ratings';
import { ReactComponent as User } from './usercomment.svg';


// import {
//   addItem
//  , addItemToCartItem
// } from '../../../store/actions/CartItemsAction';
import * as actions from '../../../store/actions/CartItemsAction';
import { selectCartItems } from '../../../store/reducers/cart/cartReselect';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';


class Reviews extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      newRate: '',
      Loading: false
    }

  }


  async addReview(data) {
    try {
      const response = await axios.post('/api/review/add', data, {
        headers: {
          Authorization: `Bearer ${this.props.userToken}`

        }
      });
      console.log("response: " + response);
    } catch (err) {
      console.log("err: " + err);
    }


  }

  async onSubmit(formData) {
    if (this.state.newRate) {
      this.setState({Loading: true})
      formData.rate = this.state.newRate
      formData.productID = this.props.productID
      console.log(formData);
      await this.addReview(formData)
      this.setState({Loading: false})
      this.submit()
      this.props.fetchHandle(true)
      //window.location.reload();
    } else {
      alert('please rate the product from the rating bar')
    }
  }

  ratingChanged = (newRating) => {
    console.log(newRating);
    this.setState({ newRate: newRating })
  };




  submit = () => {
    confirmAlert({
      title: 'Thank You!, Review has been added ' ,
      message: 'it will be review ',
      buttons: [
        {
          label: 'Ok',
          onClick:()=> window.location.reload()
        }
      ],
      afterClose: ()=> window.location.reload()

    });
  };


  render() {
    const { handleSubmit } = this.props
    return (

      <div className="review-container">


        <form className="review-form" onSubmit={handleSubmit(this.onSubmit)}>
          <ReactStars
            count={5}
            onChange={this.ratingChanged}
            size={24}
            activeColor="#ffd700"
          />

          {/*<fieldset>
              <Field
                type="text" 
                name="title" 
                id="title" 
                classN="reviewTitle" 
                
                component={InputForm}
                label="Title"
                labelClass="reviewTitleLabel" 
              />
            </fieldset>*/}

          <fieldset>
            <Field

              name="comment"
              id="comment"
              classN="reviewCommentInput"

              component={InputForm}

              labelClass="reviewCommentLabel"
            />
          </fieldset>

          {!this.state.Loading ?
            <button type="submit" class="custum-btn-form">post</button>
            : <div className="loadingBtnDiv"><div className="loaderbTn" /></div>}


          

        </form>







        <div className="reviewsMenu">
          {this.props.reviews.map(review =>

            <div className="flex-row">
              <div className="icon-button">
                <User />

              </div>

              <div className="comment-review ">
                <div className="bold" >{review.userName}</div>
                <StarRatings
                  rating={review.rate}
                  starRatedColor='rgb(255,215,0)'
                  starDimension="15px"
                  starSpacing="1px"
                  numberOfStars={5}
                  name='rating'
                />
                <div className="comment-rev" >{review.comment}</div>


              </div>

            </div>

          )}

        </div>



      </div>

    );
  }
}

// const mapDispatchToProps = dispatch => ({
//     addItem: (item, items) => dispatch(addItem(item, items))
//   });

const mapStateToProps = state => {
  return {

    cartItems: selectCartItems(state)
  }

}



export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'addReview' })
)(Reviews)