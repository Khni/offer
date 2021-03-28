//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
let User = require('../../src/models/User.js');
chai.use(chaiHttp);
//let server = require('./server/index')
let { userToSignUp, userToLogin, userToLoginWrongPass, userToLoginWrongEmail} = require('../dataToTest')



let should = chai.should();

describe('USER-ROUTER', () => {
	
	
	

    /*
      * Test the /GET route
      */
    describe('/API/USER-SIGNUP', function () {
        this.timeout(10000)
    //     before((done) => { //Before each test we empty the database
    //     User.remove({}, (err) => {
    //        done();
    //     });
    // });
        
        
        
     it('user sign up', (done) => {
            chai.request(server)
                .post('/api/user-signup')
                .send(userToSignUp)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.should.have.a.property('user');
                    res.body.should.have.a.property('refreshToken');
                    res.body.should.have.a.property('token');
                    res.body.user.should.be.an('object');
                    res.body.user.should.have.a.property('email');
                    res.body.user.should.have.a.property('_id');
                    res.should.have.status(201)


                    // res.body.length.should.be.eql(0);
                    done();
                })

        });
        
          it('user login successfully. ', (done) => {
            chai.request(server)
                .post('/api/login')
                .send(userToLogin)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.should.have.a.property('user');
                    res.body.should.have.a.property('refreshToken');
                    res.body.should.have.a.property('token');
                    res.body.user.should.be.an('object');
                    res.body.user.should.have.a.property('email');
                    res.body.user.should.have.a.property('_id');
                    res.should.have.status(200)


                    // res.body.length.should.be.eql(0);
                    done();
                })

        });
        
        
        
        
        it('user login failed wrong password. ', (done) => {
            chai.request(server)
                .post('/api/login')
                .send(userToLoginWrongPass)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.should.have.a.property('error_en');
                    res.body.should.have.a.property('error_ar');
                    res.body.error_ar.should.be.an('object');
                    res.body.error_en.should.be.an('object');
                    
                    res.should.have.status(400)


                    // res.body.length.should.be.eql(0);
                    done();
                })

        });
        
        it('user login failed wrong email. ', (done) => {
            chai.request(server)
                .post('/api/login')
                .send(userToLoginWrongEmail)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.should.have.a.property('error_en');
                    res.body.should.have.a.property('error_ar');
                    res.body.error_ar.should.be.an('object');
                    res.body.error_en.should.be.an('object');
                    
                    res.should.have.status(400)


                    // res.body.length.should.be.eql(0);
                    done();
                })

        });






        
        
    });








});


