import * as openpgp from 'openpgp';
import * as dispatchers from "../state/dispatchers";

export const generateKeypair = async (passphrase, username = 'Safe Drop') => {
    const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
        userIDs: { name: username },
        passphrase: passphrase
    });
    return { privateKey, publicKey, revocationCertificate }
}

export const decrypt = async (message, privateKey) => {
    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });
    return decrypted;
}

export const readArmoredMessage = async (armoredString) => {
    const message = await openpgp.readMessage({
        armoredMessage: armoredString
    });
    return message;
}

export const readPrivateKey = async (privateKeyArmored, passphrase) => {
    let privateKey = false;
    try {
        privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });
    } catch (error) {
        dispatchers.logMessage({ type: 'error', message: error.message })
    }
    return privateKey;
}

export const readPublicKey = async(publicKeyArmored) => {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    return publicKey;
}

export const createMessage = async(stringToEncrypt) => {
    const message = await openpgp.createMessage({ text: stringToEncrypt });
    return message;
}

export const encrypt = async(messageObject, publicKeyObject) => {
    const encrypted = await openpgp.encrypt({
        message: messageObject,
        encryptionKeys: publicKey
    });
    return encrypted;
}
