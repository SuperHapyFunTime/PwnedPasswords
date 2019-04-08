const crypto = require('crypto');
const fetch = require("node-fetch");

const password = 'password';


const fullPasswordHash = crypto.createHash('sha1')
    .update(password, 'utf8')
    .digest('hex');

const hashSubstring = fullPasswordHash.substring(0,5);


console.log('First 5 Characters of the hashed password ---> ', hashSubstring);


const searchPwnedPasswords = async (passwordSubstring) => {
    const url = 'https://api.pwnedpasswords.com/range/'+passwordSubstring;
    const response = await fetch(url);
    const passwordLst = await response.text();

    console.log(passwordLst);
};

 searchPwnedPasswords(hashSubstring);
