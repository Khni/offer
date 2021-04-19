const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const TestUserSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        require: true,
    },
    age: {
        type: Number,
        trim: true,
        require: true,
    }


})




const TestUser = mongoose.model('TestUser', TestUserSchema);

module.exports = TestUser;