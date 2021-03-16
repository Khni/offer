const chai = require('chai');
const expect = chai.expect;
const Product = require('../../src/models/Product')

describe('mongoose Product', () =>{


    it('new Product',(done)=>{

        // const product = new Product()

        // expect(product).to.have.property('_d')
        let MainProduct =  Product.findById('5f6fd12a8b6f6b001799242f')
        expect(MainProduct).to.have.property('_id')


        done()

        
    })
})