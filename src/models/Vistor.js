const mongoose = require('mongoose')


const viewedSchema = mongoose.Schema({

    ip: {
        type: String,
        trim: true
    },
    times: [{

        time: {
            type: Date,

        }
    }]

}

    ,
    {
        timestamps: true
    })





const Viewed = mongoose.model('Viewed', viewedSchema);

module.exports = Viewed;