const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fetch = require("node-fetch");

app.locals.html = "";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    let password = req.body.password;

    const fullPasswordHash = crypto.createHash('sha1')
        .update(password, 'utf8')
        .digest('hex')
        .toLocaleUpperCase();

    const firstFiveHashSubstring = fullPasswordHash.substring(0,5).toLocaleUpperCase();
    const hashToSearch = fullPasswordHash.slice(5);

    async function searchPwnedPasswords(passwordSubstring){
        const url = 'https://api.pwnedpasswords.com/range/'+passwordSubstring;
        const response = await fetch(url);
        return await response.text();
    }

    searchPwnedPasswords(firstFiveHashSubstring).then(passwords => {
        passwordMatch(passwords)
    });

    function passwordMatch(passwordHashLst) {
        let lst = passwordHashLst.split("\n");
        let passwordFound;

        Object.values(lst).forEach(
            (value) =>{
                if(value.includes(hashToSearch)){
                    let breachCount = value.split(':')[1].slice(0, -1);
                    password = `${password} was found ${parseInt(breachCount).toLocaleString()} times`;
                    passwordFound = true;
                    // res.render('index', {password: password, defaultBox: defaultBox, defaultIcon: defaultIcon});
                    let html = `<div class="isa_error"> <i class="fa fa-times-circle"></i>${password}</div>`;
                    res.render('index', { html: html })
                }
            }
        );
        if (!passwordFound) {
            password = `${password} was not found`;
            let html = `<div class="isa_success"> <i class="fa fa-check"></i>${password}</div>`;
            res.render('index', { html: html })
        }
    }
});

app.listen(port, () => console.log(`Express running → localhost:${port}`));