const auth = require('../middleware/adminAuth')
const authHiegher = require('../middleware/higherAdminAuth')
const express = require('express')
const Viewed = require('../models/Viewed')
const Product = require('../models/Product')
const User = require('../models/User')
const Voucher = require('../models/Voucher')
const router = new express.Router()





router.post('/api/voucher/create', async (req, res) => {


    const voucher = new Voucher({
        ...req.body,
        isActivated: false
        //userID: req.user._id

    })



    try {
        await voucher.save()
        res.status(201).send({ voucher })
    } catch (e) {
        res.status(400).send({ e })
    }
})

router.post('/api/voucher/verify', async (req, res) => {

    let voucher = await Voucher.findOne({ code: req.body.code })
    if (!voucher) {
        
        return res.status(400).send({
            error: "Invalid Voucher Code",
            error_ar: "رمز قسمية غير صحيح"
        })
    }
    
    if (!voucher.isActivated) {
        
        return res.status(400).send({
            error: " Voucher is not activated",
            error_ar: "قسيمة غير مفعلة"
        })
    }
    
    

    let dateForm = new Date(voucher.validFrom)
    let dateuntil = new Date(voucher.validUntil)
    // let date = new Date(req.body.date)
    let DateNow = new Date()
    console.log("nowdate" + DateNow.getTime());
    console.log("until" + dateuntil.getTime());


    if (dateuntil.getTime() < DateNow.getTime()) {
        return res.status(400).send({
            error: "Voucher is Expired",
            error_ar: "قسيمة الشراء منتهية"
        })
    }

    const timesToUse = voucher.timesToUse

    const timesUserUsed =voucher.usersApplied.filter(list => list.userID === req.body.userID)
    if(timesToUse === timesUserUsed || timesToUse < timesUserUsed){
        return res.status(400).send({
            error: "You have reached maximum times of using this Voucher",
            error_ar: "تخطيت الحد المسموح لاستخدام هذه القسيمة"
        })

    }

    if (!voucher.allUsers) {
        const user = voucher.validList.find(list => list.userID === req.body.userID)
        return res.status(400).send({
            error: "You can not use this voucher",
            error_ar: "لا يمكنك استخدام هذه القسيمة"
        })
    }

    if (!voucher.allProducts) {
        const product = voucher.selectedProducts.find(list => list.productsID === req.body.productID)
        if (!product) {
            return  res.status(400).send({
                error: "The voucher can not used for this product",
                error_ar: " لا يمكنك استخدام هذه القسيمة مع هذا المنتج "
            })
        }
    }






    try {

        res.status(200).send({ value: voucher.discount.value, inPercentage: voucher.discount.inPercentage,code: voucher.code })
    } catch (e) {
        res.status(400).send({
                error: "Error",
                error_ar: " حدث خطأ "
            })
    }
})



// router.get('/api/user-viewed', auth, async (req, res) => {

//     const viewed = await Viewed.find({userID : req.user._id})


//     let ViewedProducts = await Promise.all( viewed.map(async(v) => {

//         return await Product.findById(v.productID)
//     }))





// // const products = await Product.find({})

// // const viewedProducts = 
// //     viewed.map((f)=>products.filter((p) => p._id == f.userID ))


//     try {

//         res.status(200).send({ViewedProducts})
//     } catch (e) {
//         res.status(400).send({e})
//     }
// })

module.exports = router

