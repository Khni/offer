const mongoose = require('mongoose')


const shipperSchema = mongoose.Schema({

    fullName: {
        type: String,
        trim: true
    },
    personalCardId:{
        type: Number,
        trim: true
    }


}

    ,
    {
        timestamps: true
    })





const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = Shipper;