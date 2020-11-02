const auth = require('../middleware/auth')
const express = require('express')
const Favorite = require('../models/Favorite')
const Product = require('../models/Product')
const User = require('../models/User')
const router = new express.Router()





router.post('/api/favorite/addanddelete', auth, async (req, res) => {

    const foundFavoriteProduct = await Favorite.findOne({$and:[{productID: req.body.productID},{userID: req.user._id}]})
   console.log("produvtID" + req.body.productID);
    //console.log("found favorite" + foundFavoriteProduct);
    if (foundFavoriteProduct) {
console.log("found in delete"+foundFavoriteProduct);
        try {

            const deletedFavorite = await Favorite.deleteOne({ _id: foundFavoriteProduct._id })
            return res.status(200).send({ deleted: "deleted Recoard" })
        } catch (error) {
            return res.status(400).send({ error: error })
        }


    }
    const favorite = new Favorite({
        productID: req.body.productID,
        userID: req.user._id

    })

    try {
        await favorite.save()
        console.log("favorite" + favorite);
        res.status(201).send({ favorite })
    } catch (e) {
        res.status(400).send({ e })
    }
})




router.get('/api/user-favorites', auth, async (req, res) => {
    const favorites = await Favorite.find({ userID: req.user._id })
  

    let favoriteProducts = await Promise.all( favorites.map(async(f) => {
      
        return await Product.findById(f.productID)
    }))

    try {

        res.status(200).send({ favoriteProducts })
    } catch (e) {
        res.status(400).send({ e })
    }
})

module.exports = router

