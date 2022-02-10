    import * as wrapper from './openPgpWrapper';
    import { createMessage, encrypt, readPublicKey, readPrivateKey, readArmoredMessage, decrypt } from "./openPgpWrapper";

    export const encryptString = async(string, publicKeyArmored) => {
        const message = await createMessage(string);
        const publicKey = await readPublicKey(publicKeyArmored);
        const encrypted = await encrypt(message, publicKey);
        return encrypted;
    }

    export const decryptString = async(string, passphrase, privateKeyArmored) => {
        const privateKey = await readPrivateKey(privateKeyArmored, passphrase);
        const messageObj = await readArmoredMessage(string);
        const decrypted = await decrypt(messageObj, privateKey);
        return decrypted;
    }

    export const putPassphrase = async(passphrase, systemPublicKey) => {
        const encrypted = await encryptString(passphrase, systemPublicKey);
        return sessionStorage.setItem('passphrase', encrypted);
    }

    export const getPassphrase = async(systemPrivateKey) => {
        const encrypted = sessionStorage.getItem('passphrase');
        throw new Error("encrypted=="+encrypted)
        const privateKey = await readPrivateKey(systemPrivateKey, process.env.REACT_APP_HOUSE_KEY_PASSPHRASE);
        const message = await readArmoredMessage(encrypted);
        const decrypted = await decrypt(message, privateKey);
        return decrypted;
    }

    export const getSystemPublicKey = _ => {
        return atob(process.env.REACT_APP_SYSTEM_PUBLIC_KEY);
    }

    export const getSystemPrivateKey = _ => {
        return atob(process.env.REACT_APP_SYSTEM_PRIVATE_KEY);
    }

    export const getSystemPassphrase = _ => {
        return process.env.REACT_APP_SYSTEM_KEY_PASSPHRASE;
    }