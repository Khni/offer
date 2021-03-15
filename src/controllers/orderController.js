const Order = require('../models/Order')
const { verifyDate, checkAvailabilityBeforeOrder } = require('../lib/utils/routers/orderRouter.util')


module.exports = {
    makeOrder: async (req, res, next) => {

        const outOfStock = checkAvailabilityBeforeOrder(req.body.products)

        if (outOfStock.length > 0) {
            //frontend should redirect to a cart which will update the order list
            return res.status(400).send({
                outOfStock,
                error_ar: " لا يوجد مخزون كافي لبعض المنتجات ",
                error: "there is not enough stock for some products"
            })
        }

        if (req.body.voucherUsed) {

            let voucher = await Voucher.findOne({ code: req.body.voucherCode })
            
            await verifyDate(voucher.validFrom, voucher.validUntil).catch(error=> {
             if (error.message === 'expDate') {
                 
             }
             if (error.message === 'expDate') {
                 
            }
            })

        }






        res.status(200).json({ success: true });
    },







}