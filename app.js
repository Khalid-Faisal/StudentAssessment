const express = require("express");
const app = express()
// const bodyParser = require("body-parser");
const mysql = require('mysql');

app.use(express.json())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Candidate"
});
con.connect(function (type, sql, err) {
    if (err) throw err;
    console.log("Connected!");
});

function databaseActivity(type, sql, res) {
    con.query(sql, function (err, result) {
        //console.log("Result  : ",result,"  Error : ",err);
        if (err)
            res.send((err) ? err : "");
        if (type == "insertCandidate" || type == "assignScores")
            res.send({ "message": "Record Submitted Successfully" });
        else if (type == "getCandidate" || type == "getTopperCandidate" || type == "getAveragingScore") {
            res.send(result);
        }
    });
}
app.post('/insert', function (req, res) {
    //console.log("Data : ",req.body);
    let cname = req.body.name;
    let email = req.body.email;
    if (cname && email && cname.length > 0 && email.length > 0) {
        var sql = `INSERT INTO candidate(candidateName, candidateEmail) VALUES("${cname}","${email}")`;
        databaseActivity("insertCandidate", sql, res);
    } else
        res.send({ "Message": "Invalid Input" });
});

app.post('/assignScores', function (req, res) {
    let candId = req.body.candidateId;
    let round1 = req.body.first_round;
    let round2 = req.body.second_round;
    let round3 = req.body.third_round;
    if (round1 && round2 && round3 && candId && round3 <= 10 && round2 <= 10 && round1 <= 10) {
        var sql = `INSERT INTO test_score VALUES(${candId},${round1},${round2},${round3},${round1 + round2 + round3})`;
        databaseActivity("assignScores", sql, res);
    } else
        res.send({ "Message": "Invalid Input" });
})

app.get('/', function (req, res) {
    var sql = `SELECT * FROM candidate`;
    databaseActivity("getCandidate", sql, res)
})

app.get('/getHighest', function (req, res) {
    var sql = `select a.candidateNo,a.candidateName, a.candidateEmail,b.total_score as Score from candidate as a inner join test_score as b on a.candidateNo=b.candidateNo where b.candidateNo=(select candidateNo from test_score where total_score=(select max(total_score) from test_score));`;
    databaseActivity("getTopperCandidate", sql, res)
})

app.get('/getAveragingScore', function (req, res) {
    var sql = `select a.candidateNo,a.candidateName, b.total_score/3.0 as AverageScore from candidate as a inner join test_score as b on a.candidateNo=b.candidateNo;`;
    databaseActivity("getAveragingScore", sql, res)
})

const port = process.env.PORT || 3000
module.exports = app.listen(port, () => console.log(`Listening on ${port}`))