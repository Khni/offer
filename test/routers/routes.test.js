//process.env.NODE_ENV = 'test';


 
 const dotenv = require('dotenv');
 dotenv.config();

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../../src/index');
let server = require('./server/index')
let should = chai.should();
let User = require('./server/userModel')

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
   
/*
  * Test the /GET route
  */
  describe('/GET book',function () {
    this.timeout(10000)
   




    
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/test/test')
            .end((err,res) => {
                res.body.should.be.an('object');
                res.body.should.have.a.property('message');
                 
                // res.body.length.should.be.eql(0);
                done(); 
              })
           
            });
      });


        





  });


