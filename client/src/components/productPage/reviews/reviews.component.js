import ReactStars from "react-rating-stars-component";
import React, { Component } from 'react';
import { render } from "react-dom";
 import axios from 'axios';
import Style from './middle.scss'
import InputForm from '../../form/inputForm.js';
 
import FBicon from "../../form/img/Facebookicon.png"
import googleicon from "../../form/img/googleicon.png"
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {addItem, addItemToCartItem} from '../../../store/actions/CartItemsAction';
import * as actions  from '../../../store/actions/CartItemsAction';
import {selectCartItems} from  '../../../store/reducers/cart/cartReselect';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';


class Reviews extends Component{
	constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state ={
newRate: 5
    } 

  }
  
  
  async addReview(data){
 try{
  const response =   await axios.post('/api/product/add-comment/'+this.props.productID, data, {
      headers : { Authorization: `Bearer ${this.props.userToken}`

       } });
       console.log("response: " + response);
  } catch(err) {
console.log("err: " + err);
} 
  
  
}
	
	async onSubmit(formData) {
    formData.rate = this.state.newRate
    console.log(formData);
 await this.addReview(formData)
 this.props.fetchHandle(true)
 
  }
	
ratingChanged = (newRating) => {
  console.log(newRating);
  this.setState({newRate: newRating}) 
};

render() {
const {handleSubmit} =this.props
    return (

<div className="MiddleProduct">


<div className="reviewsMenu">
{this.props.reviews.map(review=>
<div className="comment-review ">

<p>{review.comment}</p>

</div>)}

</div>



<form onSubmit={handleSubmit(this.onSubmit)}>
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
                placeholder="Title" 
                component={InputForm}
                label="Title"
                labelClass="reviewTitleLabel" 
              />
            </fieldset>*/} 
            
         <fieldset>
              <Field
                type="text" 
                name="comment" 
                id="comment" 
                classN="reviewCommentInput" 
                placeholder="Comment" 
                component={InputForm}
                label="Comment"
                labelClass="reviewCommentLabel" 
              />
            </fieldset>
            
            
            
            <button type="submit" class="custum-btn-form">post</button>
            
          </form>
</div>

    );
   } 
}

const mapDispatchToProps = dispatch => ({
    addItem: (item, items) => dispatch(addItem(item, items))
  });

const mapStateToProps = state => {
  return {
  	
    cartItems: selectCartItems(state)
  }

}



  export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'addReview' })
  )(Reviews)