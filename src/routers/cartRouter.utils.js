const Product = require('../models/Product')



const CartProductsList =async (cart, userID) => {
    

    
    
    let CartProducts = await Promise.all(cart.products.map(async product => {

        const foundproduct = await Product.findById(product.productID)
        if (foundproduct) {
            
                 	let price = foundproduct.price
            let Qty = product.quantity
        
        
        
        if (foundproduct.onlyOrderAvailableQty) {
                if (foundproduct.availableQty < product.quantity ) {
                    Qty = foundproduct.availableQty
                }
            }

            //check if there is discount and there are limited number to buy
            if (foundproduct.discount.isActive && foundproduct.discount.limitedOrder !== 0) {
                if (foundproduct.discount.limitedOrder < Qty ) {
                    Qty = foundproduct.discount.limitedOrder
                }
            }
     
            

            return {
                
                price: price,
                _id: foundproduct._id,
                nameEn: foundproduct.nameEn,
                nameAr: foundproduct.nameAr,
                availableQty: foundproduct.availableQty,
                quantity: Qty,
                imgURLs: foundproduct.imgURLs,
                discount: foundproduct.discount,
                onlyOrderAvailableQty: foundproduct.onlyOrderAvailableQty
            }

        } //end of if foundproduct

    }))


    
    
    return CartProducts
    
    
}
module.exports = {
       CartProductsList
};


