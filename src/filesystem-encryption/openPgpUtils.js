import * as wrapper from './openPgpWrapper';
import { createMessage, encrypt, readPublicKey, readPrivateKey, readArmoredMessage, decrypt } from "./openPgpWrapper";

export const generateSystemKeypair = async() => {
    const responseObj = await wrapper.generateKeypair(process.env.REACT_APP_HOUSE_KEY_PASSPHRASE, 'SafeDrop Admin: Fred Flintstone');
    return { publicKey: responseObj.publicKey, privateKey: responseObj.privateKey};
}

export const encryptString = async(string, publicKeyArmored) => {
    const message = await createMessage(string);
    const publicKey = await readPublicKey(publicKeyArmored);
    const encrypted = await encrypt(message, publicKey);
    return encrypted;
}

export const putPassphrase = async(passphrase, systemPublicKey) => {
    const encrypted = await encryptString(passphrase, systemPublicKey);
    return sessionStorage.setItem('passphrase', encrypted);
}

export const getPassphrase = async(systemPrivateKey) => {
    const encrypted = sessionStorage.getItem('passphrase');
    console.log('process.env.REACT_APP_HOUSE_KEY_PASSPHRASE', process.env.REACT_APP_HOUSE_KEY_PASSPHRASE);
    const privateKey = await readPrivateKey(systemPrivateKey, process.env.REACT_APP_HOUSE_KEY_PASSPHRASE);
    const message = await readArmoredMessage(encrypted);
    const decrypted = await decrypt(message, privateKey);
    return decrypted;
}