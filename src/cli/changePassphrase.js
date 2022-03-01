const openpgp = require('openpgp');
require('dotenv').config()
const fs = require('fs');
const {generateRandomPassword} = require("../passwords/passwordUtils");

const changePassphrase = async() => {
    // generate random password
    const password = generateRandomPassword(16)
    throw new Error(password)
    // generate keys

    // store keys
    const privateKey = process.env.REACT_APP_PRIVATE_KEY;
    const passphrase = proess.env.REACT_APP
}
    const privateKeyArmored = process.env.REACT_APP_PRIVATE_KEY;
    const passphrase = process.env.REACT_APP_PRIVATE_KEY_PASSPHRASE;

// authenticate with passphrase to private key
    const privateKey = await openpgp.decryptKey({privateKey: privateKey, passphrase)

// decrypt the private key
}


changePassphrase();
    for(let x=1;x<=5;x++) {

    }
