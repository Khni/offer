//process.env.NODE_ENV = 'test';

let { userToSignUp } = require('../dataToTest')



//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
//let server = require('./server/index')
let should = chai.should();
let User = require('./server/userModel')

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {

    /*
      * Test the /GET route
      */
    describe('/GET book', function () {
        this.timeout(10000)



        it('add new brandnew product', (done) => {
            chai.request(server)
                .post('/api/add-product')
                .field('nameEn', 'blue Hat')
                .field('nameAr', 'قبعة زرقاء')
                .field('descEn', 'blue hat')
                .field('descAr', 'قبعة')
                .field('price', 230)
                .field('defaultDiscountValue', 30)
                .field('discountStartsAt', '2021-03-03')
                .field('discountExpAt', '2031-03-03')
                .field('inPercentage', false)
                .field('discountValue', 70)
                .field('limitedOrder', 30)
                .field('adminID', 'SOMEID')
                .field('onlyOrderAvailableQty', false)
                .field('barcode', 'kkkk')
                .field('barcodeType', 'ean13')
                .field('sectionID', 'someID')
                .field('collectionID', 'someID')
                .attach('photos', './p1.jpg', 'p1.jpg')
                .attach('photos', './p2.jpg', 'p2.jpg')
                .end((err, res) => {
                    console.log("res"+result.body);
                    res.body.should.be.an('object');
                    res.should.have.status(301)
                   // expect(result.body[0].location).to.include('/test.png')
                })
            done()
        });



        console.log("user" + userToSignUp);

        it('user sign up', (done) => {
            chai.request(server)
                .post('/api/user-signup')
                .send(userToSignUp)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.should.have.a.property('email');

                    // res.body.length.should.be.eql(0);
                    done();
                })

        });






        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/api/test/test')
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.should.have.a.property('message');

                    // res.body.length.should.be.eql(0);
                    done();
                })

        });

        it('it should TEST products', (done) => {
            chai.request(server)
                .get('/api/products')
                .end((err, res) => {
                    res.body.products.should.be.an('array');
                    // res.body.should.have.a.property('message');

                    // res.body.length.should.be.eql(0);
                    done();
                })

        });
    });








});


