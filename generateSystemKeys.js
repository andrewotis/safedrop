const openpgp = require('openpgp');
const fs = require('fs');

(async () => {
    const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
        userIDs: [{ name: 'St Nicholas', email: 'saintnick@northpole.com' }], // you can pass multiple user IDs
        passphrase: 'cZbT2TF]em@h4M&pEm+FqJ', // protects the private key
    });



    const str = "REACT_APP_SYSTEM_PRIVATE_KEY=" + btoa(privateKey) + "\nREACT_APP_SYSTEM_PUBLIC_KEY" + btoa(publicKey)
        + "\nREACT_APP_SYSTEM_KEY_PASSPHRASE=cZbT2TF]em@h4M&pEm+FqJ"
    console.log(str)

    fs.writeFile('system-keys.json', str, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })

})();