const Review = require('../models/Review')
const Product = require('../models/Product')
const User = require('../models/User')


exports.getRating = (productReviews) => {


    let revsCount = productReviews.length
    let rating = 0
    if (revsCount != 0) {
        let rev5 = productReviews.filter((rev) => rev.rate == 5).length
        let rev4 = productReviews.filter((rev) => rev.rate == 4).length * 0.8
        let rev3 = productReviews.filter((rev) => rev.rate == 3).length * 0.6
        let rev2 = productReviews.filter((rev) => rev.rate == 2).length * 0.4
        let rev1 = productReviews.filter((rev) => rev.rate == 1).length * 0.2


        let ratingCount = (rev5 + rev4 + rev3 + rev2 + rev1)
        rating = (ratingCount / revsCount) * 5


    }

    return rating
}




