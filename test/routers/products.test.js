const assert = require('assert')
const chai = require('chai')
const expect = chai.expect

describe('products routers to be tested', () => {

    //mocha ./test --recursive //for looping
    //mocha './lib/**/*.test.js' // look for any test in the end

    context('post', () => {


        it('get ', () => {

            assert.strictEqual(1, 1)
        })

        it('delete', () => {
            assert.deepStrictEqual({ id: 1, name: 'khaled' }, { id: 1, name: 'khaled' })
        })

        it('post', () => {
            expect('foo').to.be.a('string');
            expect({ a: 1 }).to.be.an('object');
            expect(null).to.be.a('null');
            expect(undefined).to.be.an('undefined');
            expect(new Error).to.be.an('error');
            expect(Promise.resolve()).to.be.a('promise');
            expect(new Float32Array).to.be.a('float32array');
            expect(Symbol()).to.be.a('symbol');
        })


    })

})