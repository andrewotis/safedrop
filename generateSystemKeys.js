const openpgp = require('openpgp');
require('dotenv').config()
const fs = require('fs');

const generateSystemKeys = async(passphrase) => {
    const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
        userIDs: [{ name: 'USER NAME', email: 'funky@buttloving.com' }], // you can pass multiple user IDs
        passphrase: passphrase, // protects the private key
    });
    return { privateKey, publicKey, revocationCertificate };
}
const writeToFile = (publicKey, privateKey, revoctionCertificate, pass) => {
    const str = "REACT_APP_SYSTEM_PRIVATE_KEY=" + btoa(privateKey) +
        "\nREACT_APP_SYSTEM_PUBLIC_KEY=" + btoa(publicKey) +
        "\nREACT_APP_SYSTEM_REVOCATION_CERT=" + btoa(revoctionCertificate) +
        "\nREACT_APP_SYSTEM_KEY_PASSPHRASE=" + btoa(pass);
    console.log(str);
    fs.writeFile('.env.generated', str, () => console.log('wrote to file successfully'));
}

const readFile = filename => {
    return fs.readFileSync(filename);
}

//const keys = generateSystemKeys("aas");
//writeToFile(keys.publicKey, keys.privateKey, keys.revocationCertificate, process.env.REACT_APP_SYSTEM_KEY_PASSPHRASE);

const contentsBuff = readFile('.env.generated');
const contents = contentsBuff.toString().split('\n');
const privateKey = atob(contents[0].split('=')[1]);
const publicKey = atob(contents[1].split('=')[1]);
const passphrase = atob(contents[3].split('=')[1]);
console.log({privateKey: privateKey, publicKey: publicKey, passphrase: passphrase, contents: contents[1]});
