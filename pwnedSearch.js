const crypto = require('crypto');
const fetch = require("node-fetch");

// const password = 'Password1234';
//
//
// const fullPasswordHash = crypto.createHash('sha1')
//     .update(password, 'utf8')
//     .digest('hex')
//     .toLocaleUpperCase();
//
// const firstFiveHashSubstring = fullPasswordHash.substring(0,5).toLocaleUpperCase();
// const hashToSearch = fullPasswordHash.slice(5);
//
// async function searchPwnedPasswords(passwordSubstring){
//     const url = 'https://api.pwnedpasswords.com/range/'+passwordSubstring;
//     const response = await fetch(url);
//     return await response.text();
// }
//
// searchPwnedPasswords(firstFiveHashSubstring).then(passwords => {
//     passwordMatch(passwords)
// });
//
// function passwordMatch(passwordHashLst) {
//     let lst = passwordHashLst.split("\n");
//
//     Object.values(lst).forEach(
//         (value) =>{
//             if(value.includes(hashToSearch)){
//                 let breachCount = value.split(':')[1].slice(0, -1);
//                 let warning = `${password} was found ${breachCount} times`;
//                 console.log(warning);
//             }
//         }
//     );
// }


module.exports = class PwnedSearch {

    wasMyPasswordOwned(password) {
        this.callPwnedPasswords(this.getFirstFiveHashSubstring(password)).then(hashedPasswordLst => {
            this.findPasswordMatch(hashedPasswordLst, password)
        });
    }

    hashPassword(password) {
        return crypto.createHash('sha1')
            .update(password, 'utf8')
            .digest('hex')
            .toLocaleUpperCase();
    }

    getFirstFiveHashSubstring(password){
        return this.hashPassword(password).substring(0,5).toLocaleUpperCase();
    }

    async callPwnedPasswords(passwordSubstring){
        const url = 'https://api.pwnedpasswords.com/range/'+passwordSubstring;
        const response = await fetch(url);
        return await response.text();
    }

    findPasswordMatch(hashedPasswordLst, password) {
        let lst = hashedPasswordLst.split("\n");

        Object.values(lst).forEach(
            (value) =>{
                if(value.includes(this.hashPassword(password).slice(5))){
                    let breachCount = value.split(':')[1].slice(0, -1);
                    let warning = `${password} was found ${breachCount} times`;
                    console.log(warning);
                }
            }
        );
    }
}

