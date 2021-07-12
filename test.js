var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app');
var should = chai.should();

chai.use(chaiHttp);

describe('/', function () {
  it('It should return candidate', (done) => {
    chai.request(server).get("/").end((err, res) => {
      if (err) done(err)
      res.should.have.status(200);
      res.should.be.a("object")
      done();
    })
  });
});

describe('/getHighest', function () {
  it('It should return highest marks', (done) => {
    chai.request(server).get("/getHighest").end((err, res) => {
      if (err) done(err)
      res.should.have.status(200);
      res.should.be.a("object")
      done();
    })
  });
});

describe('/getAveragingScore', function () {
  it('It should return average marks', (done) => {
    chai.request(server).get("/getAveragingScore").end((err, res) => {
      if (err) done(err)
      res.should.have.status(200);
      res.should.be.a("object")
      done();
    })
  });
});

describe('/insert', function () {
  let payload = {
    "name": "Khalid Faisal",
    "email": "khalid.datamax@gmail.com"
  }
  it('It should insert details', (done) => {
    chai.request(server).post("/insert").send(payload).end((err, res) => {
      if (err) done(err)
      res.should.have.status(200);
      res.should.be.a("object")
      done();
    })
  });
});

describe('/assignScores', function () {
  let payload = {
    "candidateId": 9,
    "first_round": 5,
    "second_round": 7,
    "third_round": 8
  }
  it('It should return stoppage station of given train', (done) => {
    chai.request(server).post("/assignScores").send(payload).end((err, res) => {
      if (err) done(err)
      res.should.have.status(200);
      res.should.be.a("object")
      done();
    })
  });
});

