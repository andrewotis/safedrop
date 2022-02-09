const openpgp = require('openpgp');
const fs = require('fs');

(async () => {
    const pass = "CHANGEME"

    const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
        userIDs: [{ name: 'USER NAME', email: 'funky@buttloving.com' }], // you can pass multiple user IDs
        passphrase: pass, // protects the private key
    });



    const str = "REACT_APP_SYSTEM_PRIVATE_KEY=" + btoa(privateKey) + "\nREACT_APP_SYSTEM_PUBLIC_KEY=" + btoa(publicKey)
        + "\nREACT_APP_SYSTEM_KEY_PASSPHRASE=" + pass
    console.log(str)

    fs.writeFile('systemkeys', str, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })

})();