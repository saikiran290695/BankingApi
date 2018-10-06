var express = require('express');
var app = express();

// Enable CORS
let bankingdata = {
    last4 : "4545",
    emailid: "banker@gmail.com",
    acc: "3322441155",
    chequeno: "7777",
    dob: "29-06-1995",
    mothermaidename:"john",
    debitcardIsAcitve: true,
    chequeIsActive : true,
    modelnumber: 12345678
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Get all the intents from recast
app.get('/:chequeNo/blockcheque', (req, response) => {
    if (bankingdata.chequeno = req.params.chequeNo) 
    {
        bankingdata.chequeIsActive = bankingdata.chequeIsActive ? false : true;
    }
    var status = {
        "Cheque status changed to": bankingdata.chequeIsActive ? "Active" : "InActive"
    };
    response.send(status);
});

app.get('/chequeblockFAQ', (req, response) => {
    var status = {
        "status": "FAQ"
    };
    response.send(status);
});

app.get('/invoice', (req, response) => {
    if(req.param("productno") == bankingdata.modelnumber){
    var file = __dirname + '/sampleInvoice.txt';
    response.download(file);
    }
    else{
        response.send("invalid model number");
    }
});


app.get('/icici/blockDcard', (req, response) => {
    var last4digits = req.param("last4");
    var dob = req.param("dob");
    var mmaiden = req.param("mothermaiden");
    if(bankingdata.last4 == last4digits &&
        bankingdata.dob == dob &&
        bankingdata.mothermaidename == mmaiden)
        {
            bankingdata.debitcardIsAcitve = bankingdata.debitcardIsAcitve ? false : true;
        }
        var status = {
            "Debit status changed to": bankingdata.debitcardIsAcitve ? "Active" : "InActive"
        };
    response.send(status);
});

app.get('/icici/debitcardstatus', (req, response) => {
    var status = {
        "DebitCard status ": bankingdata.debitcardIsAcitve ? "Active" : "InActive"
    };
    response.send(status);
});

const port = process.env.PORT || 80;

var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});
