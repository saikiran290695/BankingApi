var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');

// Enable CORS
let bankingdata = {
    last4: "454567678989",
    emailid: "banker@gmail.com",
    acc: "3322441155",
    chequeno: "7777",
    dob: "29-06-1995",
    mothermaidename: ["nikita", "swathi", "preety"],
    debitcardIsAcitve: true,
    chequeIsActive: true,
    modelnumber: 12345678
}
let minutes = [00, 15, 30, 45]
let hours = [8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20];
let doctorAppointment = [
    {
        "specialisation": "general physician",
        "name": "murthy"
    },
    {
        "specialisation": "ent",
        "name": "sharma"
    },
    {
        "specialisation": "cardiologist",
        "name": "ravi"
    }
]
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/bookappointment', (req, res) => {
    var doctor = req.param("doctor");
    var schedule = req.param("schedule");
    console.log("data being recieved");
        console.log(doctor);
    console.log(schedule);
    if (schedule.length > 30) {
        var regex = /[amp]/g;
        var regexhours = /[0-9]/g;
        var regexdate = /[thrd]/g;
        var data = schedule.split(" ");
        var dategiven = data[1].replace(regexdate, '');
        var min = (data[4].replace(regexhours, '') == "pm") ? (parseInt(data[4].replace(regex, '')) + 12) : data[4].replace(regex, '');
        var max = (data[6].replace(regexhours, '') == "pm") ? (parseInt(data[6].replace(regex, '')) + 12) : data[6].replace(regex, '');
        var value = Math.floor(Math.random() * (max - min) + min);
        var doctorname;
        doctorAppointment.forEach(element => {
            if (element.specialisation == doctor) {
                doctorname = element.name;
            }
        })
        var date = new Date(Date.now());
        date.setDate(parseInt(dategiven));
        date.setMonth(date.getMonth());
        date.setHours(value);
        date.setMinutes(minutes[Math.floor(Math.random() * minutes.length)]);
        date.setSeconds(00);
        var status = `Your appointment is succesfully booked with doctor ${doctorname} a ${doctor} specialist. Please report to the clinic by ${date}`;
        //{
        // "name": doctorname,
        // "time" : date
        // "response": `your appointment is succesfully booked with doctor ${doctorname} who is a specialist in ${doctor} on ${date}`
        // }
    }
    else {
        var doctorname;
        doctorAppointment.forEach(element => {
            if (element.specialisation == doctor) {
                doctorname = element.name;
            }
        })
        datecurrent = new Date(Date.now()).getDate();
        projectiondate = new Date(Date.now());
        var date = Math.random() * (10) > 5 ? new Date(projectiondate.setDate(parseInt(datecurrent))) : new Date(projectiondate.setDate(parseInt(datecurrent + 1)));
        date.setHours(hours[Math.floor(Math.random() * hours.length)])
        date.setMinutes(minutes[Math.floor(Math.random() * minutes.length)]);
        date.setSeconds(00);
        var status = `Your appointment is succesfully booked with doctor ${doctorname} a ${doctor} specialist. Please report to the clinic by ${date}`;
        //{
        // "name": doctorname,
        // "time" : date
        //"response": `your appointment is succesfully booked with doctor ${doctorname} who is a specialist in ${doctor} on ${date}`
        // }
    }
    console.log(status);
    res.send(status)
})



// Get all the intents from recast
app.get('/:chequeNo/blockcheque', (req, response) => {
    if (bankingdata.chequeno = req.params.chequeNo) {
        bankingdata.chequeIsActive = bankingdata.chequeIsActive ? false : true;
    }
    var status = {
        "Cheque status changed to": bankingdata.chequeIsActive ? "Active" : "InActive"
    };
    console.log(status);
    response.send(status);
});

app.get('/chequeblockFAQ', (req, response) => {
    var status = {
        "status": "FAQ"
    };
    console.log(status);
    response.send(status);
});

app.get('/invoice', (req, response) => {
    if (req.param("productno") == bankingdata.modelnumber) {
        var file = __dirname + '/invoice.pdf';
        response.download(file);
    }
    else {
        response.send("invalid model number");
    }
});


app.get('/icici/blockDcard', (req, response) => {
    var last4digits = req.param("last4");
    var dob = req.param("dob");
    var mmaiden = req.param("mothermaiden");
    if (bankingdata.last4 == last4digits &&
        bankingdata.dob == dob &&
        bankingdata.mothermaidename.lastIndexOf[mmaiden] != -1) {
        bankingdata.debitcardIsAcitve = bankingdata.debitcardIsAcitve ? false : true;
    }
    var status = {
        "Debit status changed to": bankingdata.debitcardIsAcitve ? "Active" : "InActive"
    };
    console.log(status);
    response.send(status);
});

app.get('/icici/debitcardstatus', (req, response) => {
    var status = {
        "DebitCard status ": bankingdata.debitcardIsAcitve ? "Active" : "InActive"
    };
    console.log(status);
    response.send(status);
});

app.get('/icici.html', (req, response) => {
    fs.readFile(__dirname + "/icici.html", function (error, data) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.write(data);
        response.end();
    });
 
})

app.get('/practo.html', (req, response) => {
    fs.readFile(__dirname + "/practo.html", function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write(error);
            response.end();
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(data);
            response.end();
        }
    });
})

app.get('/snapdeal.html', (req, response) => {
    fs.readFile(__dirname + "/snapdeal.html", function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write(error);
            response.end();
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(data);
            response.end();
        }
    });
})


const port = process.env.PORT || 80;

var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});
