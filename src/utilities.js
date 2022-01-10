import * as openpgp from "openpgp";
import { map } from './passwordGeneratorMap';
import * as dispatchers from './state/dispatchers';

const fs = require('fs');

export const addPassword = (database, passphrase, setDatabase, newPassword) => {
    // unlock the private key
    // decrypt the database
    // add to the datbase
    // encrypt the database
    // save the file
}


export const loadFile = (path = '%HOMEPATH%\\db.safe') => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        dispatchers.setDbFile(data);
      } catch (err) {
        dispatchers.logErrorMessage(err)
      }
}

export const generateRandomPassword = passwordLength => {
    let results = '';
    for(let n=0;n<passwordLength;n++) {
        results += map[getRandomNumber(map.length)].toString();
    }
    return results;
}

export const getRandomNumber = max => {
    return Math.floor(Math.random() * max);
}

export const generateKeypair = async (passphrase) => {
    const { privateKey, publicKey, revokationCertificate } = await openpgp.generateKey({
        userIDs: { name: 'Jon Smith' },
        passphrase: passphrase,
    });
    return { privateKey, publicKey, revokationCertificate }
};

// return true or false based on passphrase validity
export const verifyPassphrase = async (privateKeyArmored, passphrase) => {
    console.log('made it to verifyPassphrase')
    let privateKey = false;
        
    try {
        privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });
    } catch (error) {
        //logError(error.message)
    }
    
    return privateKey === false ? false : privateKey.isDecrypted();
}

export const decrypt = async (privateKey, encryptedData) => {
    
}


export const triedToPaste = e => {
    e.preventDefault();
    alert('no pasting');
    return false;
}