import * as openpgp from 'openpgp';
import {logMessage} from "../state/slices/system/systemDispatchers";
import {decryptKey} from "openpgp";

export const generateKeypair = async (passphrase, username = 'Safe Drop') => {
    const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
        userIDs: { name: username },
        passphrase: passphrase
    });
    return { privateKey, publicKey, revocationCertificate }
}



export const readArmoredMessage = async (armoredString) => {
    const encryptedMessage = await openpgp.readMessage({
        armoredMessage: armoredString // parse encrypted bytes
    });
    return encryptedMessage;
}

export const resetPrivateKeyPassphrase = async (privateKeyArmored, oldPassphrase, newPassphrase) => {
    const privateKey = await readPrivateKey(privateKeyArmored, oldPassphrase);
    let encryptedWithNewPassphrase;
    try {
        encryptedWithNewPassphrase = await openpgp.encryptKey({
            privateKey: privateKey,
            passphrase: newPassphrase
        })
    } catch(e) {
        logMessage({type:'error',message: e.message});
    }
    return encryptedWithNewPassphrase;
}

export const readPrivateKey = async (privateKeyArmored, passphrase) => {
    let privateKey = false;
    try {
        privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });
    } catch (error) {
        logMessage({ type: 'error', message: error.message });
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
        encryptionKeys: publicKeyObject
    });
    return encrypted;
}

export const decrypt = async (message, privateKey) => {
    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });
    return decrypted;
}