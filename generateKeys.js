const openpgp = require('openpgp');
require('dotenv').config()
const fs = require('fs');

// generate the key
console.log('running generateKeys with a passphrase');
console.log(atob(process.env.REACT_APP_ENV_USER_1));
throw new Error('');


const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
    userIDs: atob(process.env.REACT_APP_ENV_USER_1), // you can pass multiple user IDs
    passphrase: process.env.REACT_APP_PASSPHRASE_1, // protects the private key
});

// save it to a file
const writeToFile = (publicKey, privateKey, revoctionCertificate, pass) => {
    uuidv4();
    fs.writeFile('_public.key', JSON.stringify(publicKey), () => console.log('wrote to file successfully'));
    fs.writeFile('_private.key', JSON.stringify(privateKey), () => console.log('wrote to file successfully'));
    fs.writeFile('_revocation.certificate', JSON.stringify(revocationCertificate), () => console.log('wrote to file successfully'));
}

const readFile = filename => {
    return fs.readFileSync(filename);
}

print()

/*
const keys = generateKeys("buttwipe");
writeToFile(keys.publicKey, keys.privateKey, keys.revocationCertificate, process.env.REACT_APP_PRIVATE_KEY_PASSPHRASE);

const contentsBuff = readFile('.env.generated');
const contents = contentsBuff.toString().split('\n');
const privateKey = atob(contents[0].split('=')[1]);
const publicKey = atob(contents[1].split('=')[1]);
const passphrase = atob(contents[3].split('=')[1]);
console.log({privateKey: privateKey, publicKey: publicKey, passphrase: passphrase, contents: contents[1]});

 */