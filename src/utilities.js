import * as openpgp from "openpgp";
// import * as fs from 'fs';

export const generateKeypair = async (keyType, userName, userEmail, passphrase ) => {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: keyType,
        rsaBits: 4096, 
        userIDs: [{ name: userName, email: userEmail }],
        passphrase: passphrase,
    });
    return { privateKey, publicKey }
};

export const encrypt = async (publicKey, plainData) => {
    const encrypted = await openpgp.encrypt({
      message: openpgp.Message.fromText(plainData),
      publicKeys: (await openpgp.Key.readArmored(publicKey)).keys,
    });
    console.log(encrypted.data);
    return encrypted.data;
}

export const decrypt = async (privateKey, encryptedData)
    const decrypt = await openpgp.decrypt({
        encryptedData,
        //verificationKeys: publicKey, // optional
        decryptionKeys: privateKey
    });
    for await (const chunk of decrypted.data) {
        chunks.push(chunk);
    }
    const plaintext = chunks.join('');
    console.log(plaintext); // 'Hello, World!'
}


export const triedToPaste = e => {
    e.preventDefault();
    alert('no pasting');
    return false;
}