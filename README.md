# encryptkeeper
a tool to encrypt and decrypt data using openpgp keypairs. primarily a password safe, but also contains keypair generator, a secured calendar,  secured notes, and a few other goodies

- written in react
- integrated sense of humor :-)
- initially a keypair is generated, and then data is encrypted and decrypted based on that
- all processing is done locally in a web browser using openpgpjs (no data is ever stored on a server, or sent over the internet)
- the app outputs all data as a JSON file, with an extension of .crypt
- there *WILL* be a react native/mobile version of this coming very soon 

data storage. when the user first runs the app, they are prompted to generate a PGP keypair which they then
are able to download locally as a file named safedrop.json. this file is the JSON.stringify of the following
structured object:
{
    keys: {
        public: publicKey,
        private: privateKey,
        revoke: revokationCertificate
    },
    data: {                             // everything in the data object is encrypted all as a JSON string
        passwords: [                    // passwords is an array of objects holding password data
            {
                id: id,                 // id is an auto increment that just looks up the most recent id + 1
                title: title,
                password: password,
                meta: [{k: key, v: val}] // meta is an array of key value pair objects for storing literally 
                                         // anything about the passwords
            }
        ],
        notes: [
            {
                id
            }
        ]
    }
}
there is some data that is stored temporarily. The users passphrase is encrypted with a set of house keys and stored
in sessionStorage with a 5 minute (max, can be configured less) idle timeout
the redux store is also copied to sessionStorage, just for the case when the user accidentally closes the browser and
stuff like that. the redux store holds the drop file, but all sensitive data is in redux store encrypted. also, no
decrypted sensitive data ever passes through the redux store. Any time an item is decrypted to view, it is done through
the methods in the utilities.js file.

logic for adding or updating sensitive content:
    // pull the current dropFile from the store
    // decrypt the dropFile.data
    // JSON parse it
    // push the new record on to it
    // encrypt it
    // send it back to the redux store
    // store in localstorage