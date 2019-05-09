# PwnedPasswords

This program takes a password or any string and checks it against Troy Hunt's “haveibeenpwned” API to check any password against their list of leaked passwords for which are more than half a billion passwords which have previously been exposed in data breaches. This is a every growing list that is added to for every new data breach that occurs.

The code implements this using k-Anonymity model that allows a password to be searched securely, without sending the actual password to haveibeenpwned.

Please dont type your actual password into a random box on the internet....

## Built With

* [Express - Node.js](https://expressjs.com/) - The web framework 
* [Have I Been Pwned: API](https://haveibeenpwned.com/API/v2) - The Pwned Password API 

## Authors

**Daniel Boyle**

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software
