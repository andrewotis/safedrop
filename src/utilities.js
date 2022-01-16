import * as openpgp from "openpgp";
import * as dispatchers from './state/dispatchers';
import { houseKeys } from './houseKeys';
import store from './state/store';

export const addPassword = async (dropFile, passwordObject) => {
    console.debug('utilities.addPassword fired');
    // add logic to verify that there is in fact the asephrassp item in session storage, if not, re-verify
    dispatchers.setLoading(true);
    const decrypted = await decryptDropFileData(dropFile)
    console.debug('decrypted', decrypted);
    decrypted.passwords.push(passwordObject);
    console.debug('decrypted.passwords.push', decrypted);
    const encrypted = await encryptDropFileData({...dropFile, data: decrypted});
    console.debug('encrypted', encrypted);
    dispatchers.updateDropFile({...dropFile, data: encrypted});
    dispatchers.setUnsavedDropFile(true);
    dispatchers.setLoading(false);
    return encrypted;
}

export const stars = num => {
    let r = '';
    for(let n=1;n<=num;n++) {
        r += '*';
    }
    return r;
}

export const leadingStars = (str, num) => {
    return stars(num) + str.substring(str, num);
}

export const trailingStars = (str, num) => {
    return str.substring(0, str.length - num) + stars(num);
}

export const innerStars = (str, numExposed) => {
    // will expose numExposed characters at start and end of string
    return str.substring(0, numExposed) + stars(str.length-(numExposed * 2)) + str.substring(str.length - numExposed);
}

export const settingsHelper = {
    get: () => {
        console.debug('utilities.settingsHelper.get fired');
        const settings = sessionStorage.getItem('settings');
        if(settings !== undefined) {
            return JSON.parse(settings);
        } else {
            loadSettings(store.getState().dropFile);
            return JSON.parse(sessionStorage.getItem('settings'));
        }
    },
    set: (settings) => {
        console.debug('utilities.settingsHelper.set fired');
        sessionStorage.setItem('settings', JSON.stringify(settings))
    },
}

export const blockClipboardAccess = _ => {
    const settings = settingsHelper.get();
    dispatchers.setActivePasswordCopy(true);
    setTimeout(() => {
        dispatchers.setActivePasswordCopy(false);
    }, (settings.clipboardEraseTimer * 1000));
}

export const clickToCopy = async (str) => {
    console.debug('utilities.clickToCopy fired');
    blockClipboardAccess();
    const settings = settingsHelper.get();
    copyToClipBoard(str);

    setTimeout(() => {
        copy30Randoms()
    }, (settings.clipboardEraseTimer * 1000));
}

const copy30Randoms = _ => {
    console.debug('utilities.copy30Randoms fired');
    const state = store.getState();
    for (let i = 0; i < 30; i++) {
        (function (i) {
            setTimeout(function () {
                if(!state.activePasswordCopy) {
                    //copyToClipBoard(getRandomNumber(100).toString());
                    copyToClipBoard(' ');
                }
            }, 300 * (i + 1));
        })(i);
    }
}

export const copyToClipBoard = str => {
    console.debug('utilities.copyToClipBoard fired');
    navigator.clipboard.writeText(str);
}

export const decryptAndReturnPasswords = async (dropFile) => {
    console.debug('utilities.decryptAndReturnPasswords fired');
    console.debug('dropfile', dropFile);
    dispatchers.setLoading(true);
    const decrypted = await decryptDropFileData(dropFile);
    console.debug('decrypted', decrypted);
    dispatchers.setLoading(false);
    return decrypted.passwords;
}

export const encryptAndStoreInSessionStorage = async (key, value) => {
    console.debug('utilities.encryptAndStoreInSessionStorage fired');
    const encrypted = await encryptWithHouseKey(value);
    sessionStorage.setItem(key, encrypted);
}

export const retrieveAndDecryptFromSessionStorage = async (key) => {
    console.debug('utilities.retrieveAndDecryptFromSessionStorage fired');
    const decrypted = await decryptWithHouseKey(sessionStorage.getItem(key));
    return decrypted;
}

export const encryptDropFileData = async (dropFile) => {
    console.debug('utilities.encryptDropFileData fired');
    const encrypted = await encryptStringWithArmoredKey(JSON.stringify(dropFile.data), dropFile.keys.publicKeyArmored);
    return encrypted;
}

export const decryptDropFileData = async (dropFile) => {
    console.debug('utilities.decryptDropFileData fired');
    if(dropFile === undefined) {
        dispatchers.logMessage({type: 'error', message: 'invalid dropFile specified to decryptDropFileData method!'})
        throw "invalid dropfile";
    }
    const passphrase = await decryptWithHouseKey(sessionStorage.getItem('asephrassp'));
    const privateKey = await readPrivateKey(dropFile.keys.privateKeyArmored, passphrase);
    const message = await readArmoredMessage(dropFile.data);
    const decrypted = await decryptMessage(message, privateKey);
    return JSON.parse(decrypted);
}

export const encryptWithHouseKey = async stringToEncrypt => {
    console.debug('utilities.encryptWithHouseKey fired');
    const encrypted = await encryptStringWithArmoredKey(stringToEncrypt, houseKeys.keys.publicKeyArmored);
    return encrypted;
};

export const loadSettings = async (dropFile) => {
    console.debug('utilities.loadSettings fired');
    const decrypted = await decryptDropFileData(dropFile);
    console.debug(decrypted);
    settingsHelper.set(decrypted.settings);
}

export const encryptStringWithArmoredKey = async (stringToEncrypt, armoredPublicKey) => {
    console.debug('utilities.encryptStringWithArmoredKey fired');
    const publicKey = await openpgp.readKey({ armoredKey: armoredPublicKey });
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: stringToEncrypt }),
        encryptionKeys: publicKey
    });
    return encrypted;
}
export const decryptMessage = async (message, privateKey) => {
    console.debug('utilities.decryptMessage fired');
    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });
    return decrypted;
}

export const generateRandomPassword = passwordLength => {
    console.debug('utilities.generateRandomPassword fired');
    let results = '';
    const map = settingsHelper.get().passwordGenerator.characterMap;
    for(let n=0;n<passwordLength;n++) {
        results += map[getRandomNumber(map.length)].char.toString();
    }
    return results;
}

export const getRandomNumber = max => {
    return Math.floor(Math.random() * max);
}

export const generateKeypair = async (passphrase) => {
    console.debug('utilities.generateKeypair fired');
    const { privateKey, publicKey, revokationCertificate } = await openpgp.generateKey({
        userIDs: { name: 'Safe Drop' },
        passphrase: passphrase
    });
    return { privateKey, publicKey, revokationCertificate }
};

// return true or false based on passphrase validity
export const verifyPassphrase = async (privateKeyArmored, passphrase) => {
    console.debug('utilities.verifyPassphrase fired');
    const privateKey = await readPrivateKey(privateKeyArmored, passphrase);
    return privateKey === false ? false : privateKey.isDecrypted();
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

export const readArmoredMessage = async (armoredString) => {
    const message = await openpgp.readMessage({
        armoredMessage: armoredString 
    });
    return message;
}

export const decryptWithHouseKey = async (stringToDecrypt) => {
    try {
        const privateKey = await readPrivateKey(houseKeys.keys.privateKeyArmored, 'abc');
        const message = await readArmoredMessage(stringToDecrypt);
        const decrypted = await decryptMessage(message, privateKey);
        return decrypted;
    } catch (e) {

    }

}

export const triedToPaste = e => {
    e.preventDefault();
    alert('no pasting');
    return false;
}