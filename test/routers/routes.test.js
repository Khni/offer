//process.env.NODE_ENV = 'test';

require('../../src/db/mongoose')
 let mongoose = require("mongoose");
 const dotenv = require('dotenv');
 dotenv.config();
 let MongoURL = process.env.MONGODB_URL
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../../src/index');
let server = require('./server/index')
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
// describe('Books', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Book.remove({}, (err) => {
//            done();
//         });
//     });
/*
  * Test the /GET route
  */
  describe('/GET book', function() {
    this.timeout(3000)
    before(function(done) {
        mongoose.connect(MongoURL, function(error) {
            if (error) console.error('Error while connecting:\n%\n', error);
            console.log('connected');
            done(error);
        });
    });




    
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/test/test')
            .end((err, res) => {
                  res.should.have.status(203);
                   res.body.should.be.a('array');
                //   res.body.length.should.be.eql(0);
              done();
            });
      });


        





  });

//});
