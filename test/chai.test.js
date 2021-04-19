const assert = require('assert')
const chai = require('chai')
const expect = chai.expect
const {AddNum} = require('./demo.js')

// describe('chai test', () => {

//     //mocha ./test --recursive //for looping
//     //mocha './lib/**/*.test.js' // look for any test in the end

//     context('chai.context', () => {


       

//         it('should DeepEqual Object', () => {
//             assert.deepStrictEqual({ id: 1, name: 'khaled' }, { id: 1, name: 'khaled' })
//         })

//         it('chai to be', () => {
//             expect('foo').to.be.a('string');
//             expect({ a: 1 }).to.be.an('object');
//             expect(null).to.be.a('null');
//             expect(undefined).to.be.an('undefined');
//             expect(new Error).to.be.an('error');
//             expect(Promise.resolve()).to.be.a('promise');
//             expect(new Float32Array).to.be.a('float32array');
//             expect(Symbol()).to.be.a('symbol');
//         })


//     })

// })