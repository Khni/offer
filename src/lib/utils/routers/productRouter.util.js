exports.productsWithRate =async() => {


let products = await Product.find({})
  
let productsWithRate =await Promise.all( products.map(async(product)=>{
const productReviews = await Review.find({$and:[{ productID: product._id}, { active: true}]})
const productRate = getRating(productReviews)

return {...product.toObject(),   rate : productRate}
}))

return productsWithRate
} 


exports.finalPrice = (product) =>{
    
      
  
     let finalPrice = product.price
     let inPercentage = product.inPercentage
     let discountValue = product.discountValue
     const defaultDiscountValue= product.defaultDiscountValue
  
  
     let dateForm = new Date(product.discountStartsAt)
    let dateuntil = new Date(product.discountExpAt)
    
    let DateNow = new Date()
    
 let discountInPercentage  = (defaultDiscountValue/ finalPrice) *100

    if (dateuntil.getTime() < DateNow.getTime() || DateNow.getTime() < dateForm.getTime() ) {
        finalPrice = finalPrice - defaultDiscountValue
       
        return{ finalPrice, discountInPercentage, discountValue:defaultDiscountValue} 
    }
     
     
     
     if (!inPercentage) {
     	finalPrice = finalPrice - discountValue
     discountInPercentage = (discountValue/ finalPrice) *100 
     return{ finalPrice, discountInPercentage, discountValue} 
    } else {
    	finalPrice = finalPrice - (discountValue/100*finalPrice)
   discountInPercentage=  discountValue
return{ finalPrice, discountInPercentage, discountValue} 
    } 
      return{ finalPrice, discountInPercentage, discountValue:defaultDiscountValue} 

}