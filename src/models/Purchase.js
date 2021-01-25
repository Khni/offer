const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const purchaseSchema = mongoose.Schema({


  shortid: {
    'type': String,
    'default': shortid.generate
  },

  supplierID: {
    type: mongoose.Schema.Types.ObjectId,
   // required: true,
    ref: 'Supplier'
  },
  purchaseNum: {
    type: Number,
    required: true

  },
  products: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'Product'

    },
    nameEn: {
      type: String,
      required: true,
      ref: 'Product'

    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }

  }],
  totalPrice: {
    type: Number,
    required: true
  },
  history: [{
    time: {
      type: Date,
      default: () => Date.now()
    },
    operation:{
      type: String
    }
    
    
    
  }],
  status: {
    type: String
  },








},
  {
    timestamps: true
  }
)




const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;