const Product = require('../../../models/Product')


//this function for vouchers or discounts for date verification 
exports.verifyDate = async(dataFrom, dateUntil) => {


    let beginDate = new Date(dataFrom)
    let expDate = new Date(dateUntil)

    let DateNow = new Date()

    //check if it expired 
    if (expDate.getTime() < DateNow.getTime()) {
        return Promise.reject(new Error('expDate'))

    }

    //check if it started? 
    if (beginDate.getTime() > DateNow.getTime()) {
        return Promise.reject(new Error('didNotBegin'))
    }


    //success 
    return Promise.resolve(true)

}



exports.verifyVoucher =async (voucher) => {

  await verifyDate(voucher.validFrom, voucher.validUntil)
    
    //check if it expired 
    if (expDate.getTime() < DateNow.getTime()) {
        return Promise.reject(new Error('expDate'))

    }

    //check if it started? 
    if (beginDate.getTime() > DateNow.getTime()) {
        return Promise.reject(new Error('didNotBegin'))
    }


    //success 
    return Promise.resolve(true)

}











//check Availability
// exports.checkAvailability = (productsList) => {
//     let outOfStock = []

//     await Promise.all(productsList.map(async (product) => {

//         let MainProduct = await Product.findById(product._id)


//         if (MainProduct.onlyOrderAvailableQty) {
//             if (MainProduct.availableQty < product.quantity) {
//                 outOfStock = outOfStock.concat({ _id: MainProduct._id, Qty: MainProduct.availableQty, Ordered: product.quantity })
//             }
//         }







//     }))
//     if (outOfStock.length > 0) {
//         //frontend should redirect to a cart which will update the order list
//         return res.status(400).send({
//             outOfStock,
//             error_ar: " لا يوجد مخزون كافي لبعض المنتجات ",
//             error: "there is not enough stock for some products"
//         })
//     }


// }


exports.checkAvailabilityBeforeOrder =async (productList,Productmodel) => {
    let outOfStock = []

    try {
        let MainProduct = await Product.findById('5f6fd12a8b6f6b001799242f')
    } catch (error) {
        return error
    }

    // await Promise.all(productList.map(async (product) => {


    //     try {
    //         let MainProduct = await Productmodel.findById(product._id)
    //     } catch (error) {
    //         return error
    //     }
        


    //     if (MainProduct.onlyOrderAvailableQty) {
    //         if (MainProduct.availableQty < product.quantity) {
    //             outOfStock = outOfStock.concat({ _id: MainProduct._id, Qty: MainProduct.availableQty, Ordered: product.quantity })
    //         }
    //     }


    // }))
   return MainProduct;
   

}


