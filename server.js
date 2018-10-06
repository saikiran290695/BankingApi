var express = require('express');
var app = express();

// Enable CORS
let bankingdata = {
    emailid: "banker@gmail.com",
    acc: "3322441155",
    chequeno: "7777",
    dob: "29-06-1995",
    mothermaidename:"maiden",
    isacitve: true
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Get all the intents from recast
app.get('/:chequeNo/blockcheque', (req, response) => {
    // var last4debitcardno = req.param("last4");
    // var mmaiden = req.param("mothermaiden");
    // var dob = req.param("dob");
    if (bankingdata.chequeno = req.params.chequeNo
    ) 
    {
        bankingdata.isacitve = bankingdata.isacitve ? false : true;
    }
    var status = {
        "Cheque status changed to": bankingdata.isacitve ? "Active" : "InActive"
    };
    response.send(status);
});

app.get('/chequeblockFAQ', (req, response) => {
    var status = {
        "status": "FAQ"
    };
    response.send(status);
});

const port = process.env.PORT || 80;

var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});
