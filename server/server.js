/* Load Server Module */
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const path = require('path');

/* Load DB Module */
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


/* Load Function */
const sms = require('../sms/sms');

/* Open Server */
app.listen(5000, function () {
    console.log('listening on 5000')
})

/* CSR */
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.post('/sendSMS', (req, res) => {
    sms(req.body.phone, req.body.content);
})

/* Load DB */
const USER_DATA = JSON.parse(fs.readFileSync('../DB/USER_ACCOUNT.json', 'utf8'));

app.post('/RequestLogin', (req, res) => {
    const SIGN_IN = {
        ID: req.body.ID,
        PASSWORD: req.body.PASSWORD
    };
    let SIGN_IN_RESULT = false;

    for (const [INDEX, DATA] of Object.entries(USER_DATA)) {
        if (SIGN_IN.ID === DATA.ID && SIGN_IN.PASSWORD === DATA.PASSWORD) {
            SIGN_IN_RESULT = true;
            break;
        }
    }
    res.send({SIGN_IN_RESULT: SIGN_IN_RESULT});
})

// let Test = () => {

//     // fs.writeFileSync("../DB/USER_ACCOUNT.json", JSON.stringify(USER_DATA, null, 2));

//     /* -------------------------------------------------------------------------------------- */

//     // const SIGN_IN = {
//     //     ID: req.body.ID,
//     //     PASSWORD: req.body.PASSWORD
//     // };
//     // let SIGN_IN_RESULT = false;

//     // for (const [INDEX, DATA] of Object.entries(USER_DATA)) {
//     //     if (SIGN_IN.ID === DATA.ID && SIGN_IN.PASSWORD === DATA.PASSWORD) {
//     //         SIGN_IN_RESULT = true;
//     //         break;
//     //     }
//     // }

//     // res.send({SIGN_IN_RESULT: SIGN_IN_RESULT});

//     // fs.writeFileSync("./DB/USER_ACCOUNT.json", JSON.stringify(SIGN_IN, null, 2));
// }

// Test();