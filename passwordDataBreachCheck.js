const PwnedSearch = require('./pwnedSearch');

let passwordCheck = new PwnedSearch();
passwordCheck.wasMyPasswordOwned('Password1234');