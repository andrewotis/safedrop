const openpgp = require('openpgp');
require('dotenv').config()
const fs = require('fs');



const changePassphrase = async() => {
    console.log('running changePassphrase');
    console.log('config values'), {
    const privateKey = process.env.REACT_APP_PRIVATE_KEY;
    const passphrase = proess.env.REACT_APP
}
    const privateKeyArmored = process.env.REACT_APP_PRIVATE_KEY;
    const passphrase = process.env.REACT_APP_PRIVATE_KEY_PASSPHRASE;

// authenticate with passphrase to private key
    const privateKey = await openpgp.decryptKey({privateKey: privateKey, passphrase)

// decrypt the private key
}

