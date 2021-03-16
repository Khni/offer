const chai = require('chai');
const expect = chai.expect;
const Product = require('../../src/models/Product')

describe('mongoose Product', () =>{
    before(function() {
   

        // runs before all tests in this file regardless where this line is defined.
    });

    it('new Product',async()=>{

        // const product = new Product()

        // expect(product).to.have.property('_d')
    //  let mProduct=   Product.findById('5f6fd12a8b6f6b001799242f').then((product)=>
    //   product
    //   done()
    //   )
    //    .catch((e)=>e)


        let MainProduct = await Product.findById('5f6fd12a8b6f6b001799242f')
        expect(MainProduct).to.have.property('_id')


        

        
    })
})