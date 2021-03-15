const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const Product = require('../../src/models/Product')


const { verifyDate, checkAvailabilityBeforeOrder } = require('../../src/lib/utils/routers/orderRouter.util')


context('VerifyDates', async () => {


    it('verifyDates: valid dates', () => {

        expect(verifyDate('2019-3-17', '3050-3-15')).to.eventually.equal('Winner')

    })

    it('verifyDates: invalid beginDate date', () => {

        expect(verifyDate('2090-3-11', '3050-4-4')).to.be.rejectedWith('didNotBegin')

    })

    it('verifyDates: Expired date', () => {

        expect(verifyDate('2012-3-11', '2018-4-4')).to.be.rejectedWith('expDate')

    })


})


context('checkAviableProductBeforeOrdering', async () => {
    

    products = [
        {
            _id: 1,
            onlyOrderAvailableQty: true,
            availableQty: 3


        },
        {
            _id: 2,
            onlyOrderAvailableQty: false,
            availableQty: 4
        }
    ]



it('checkAvailabilityBeforeOrder: pass', () => {
cart = [{
        _id: '5f6e12ee4dd46300176473f4',
        quantity: 2,
    },
    {
        _id: '5f6fd12a8b6f6b001799242f' ,
        quantity: 3,
    }
    ]
        expect(checkAvailabilityBeforeOrder(cart, Product)).to.be.an('array').that.is.empty

    })



})