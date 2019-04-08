const crypto = require('crypto');
const fetch = require("node-fetch");

const password = 'daniel93';


const fullPasswordHash = crypto.createHash('sha1')
    .update(password, 'utf8')
    .digest('hex')
    .toLocaleUpperCase();

const firstFiveHashSubstring = fullPasswordHash.substring(0,5).toLocaleUpperCase();
const hashToSearch = fullPasswordHash.slice(5);

// console.log('Full hashed password ---> ', fullPasswordHash);
// console.log('First 5 Characters of the hashed password ---> ', firstFiveHashSubstring);


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

    Object.values(lst).forEach(
        (value) =>{
            if(value.includes(hashToSearch)){
                let breachCount = value.split(':')[1].slice(0, -1);
                let warning = `${password} was found ${breachCount} times`;
                console.log(warning);
            }
        }
    );
}
