/*import store from './store';
import * as actions from './actions';



export const setDropFile = (fileJSON, fileName) => {
    store.dispatch({
        type: actions.SET_DROPFILE,
        payload: {
            keys: fileJSON.keys,
            data: fileJSON.data,
            filename: fileName
        }        
    });
}

export const updateDropFile = (updatedDropFile) => {
    const obj = {
        keys: updatedDropFile.keys,
        data: updatedDropFile.data,
        filename: updatedDropFile.fileName
    };
    sessionStorage.setItem('dropFile', JSON.stringify(obj));
    store.dispatch({
        type: actions.SET_DROPFILE,
        payload: obj
    });
}

export const setAuthenticated = status => {
    store.dispatch({
        type: actions.SET_AUTHENTICATED,
        payload: status
    });
}

export const verifyPassphrase = passphrase => {
    store.dispatch({
        type: actions.VERIFY_PASSPHRASE_REQUESTED,
        payload: passphrase
    });
}

export const logMessage = msgObj => { // { type: "error", message: "error message here"} or success
    store.dispatch({
        type: actions.LOG_MESSAGE,
        payload: msgObj
    });
}



export const setPrivateKey = key => {
    store.dispatch({
        type: actions.SET_PRIVATE_KEY,
        payload: key
    })
}

export const setPublickey = key => {
    store.dispatch({
        type: actions.SET_PUBLIC_KEY,
        payload: key
    })
}

export const setRevokationCertificate = cert => {
    store.dispatch({
        type: actions.SET_REVOKATION_CERTIFICATE,
        payload: cert
    })
}



export const generateKeypair = passphrase => {
    store.dispatch({
        type: actions.GENERATE_KEYPAIR_REQUESTED,
        payload: passphrase
    });
}*/