//this function for vouchers or discounts for date verification 
exports.verifyDate =(dataFrom, dateUntil) => {


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


//check Availability
exports.checkAvailability =(productsList) => {
	let outOfStock = []

    await Promise.all(productsList.map(async (product) => {

        let MainProduct = await Product.findById(product._id)


        if (MainProduct.onlyOrderAvailableQty) {
            if (MainProduct.availableQty < product.quantity) {
                outOfStock = outOfStock.concat({ _id: MainProduct._id, Qty: MainProduct.availableQty, Ordered: product.quantity })
            }
        }







    }))
    if (outOfStock.length > 0) {
        //frontend should redirect to a cart which will update the order list
        return res.status(400).send({
            outOfStock,
            error_ar: " لا يوجد مخزون كافي لبعض المنتجات ",
            error: "there is not enough stock for some products"
        })
    }
	
	
	}
	
	
exports.checkAvailabilityBeforeOrder =() => {
	let outOfStock = []

    await Promise.all(req.body.products.map(async (product) => {

        let MainProduct = await Product.findById(product._id)


        if (MainProduct.onlyOrderAvailableQty) {
            if (MainProduct.availableQty < product.quantity) {
                outOfStock = outOfStock.concat({ _id: MainProduct._id, Qty: MainProduct.availableQty, Ordered: product.quantity })
            }
        }







    }))
    if (outOfStock.length > 0) {
        //frontend should redirect to a cart which will update the order list
        return res.status(400).send({
            outOfStock,
            error_ar: " لا يوجد مخزون كافي لبعض المنتجات ",
            error: "there is not enough stock for some products"
        })
    }
	
	
	}
	
	
