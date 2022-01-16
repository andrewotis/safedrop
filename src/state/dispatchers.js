import store from './store';
import * as actions from './actions';

export const setLoading = (status) => {
    store.dispatch({
        type: actions.SET_LOADING,
        payload: status
    });
}

export const setActivePasswordCopy = status => {
    store.dispatch({
        type: actions.SET_ACTIVE_PASSWORD_COPY,
        payload: status
    });
}

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

export const setUnsavedDropFile = (status) => {
    store.dispatch({
        type: actions.SET_UNSAVED_FILE,
        payload: status
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

export const dismissLogMessage = msg => {
    store.dispatch({
        type: actions.DISMISS_LOG_MESSAGE,
        payload: msg
    })
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

export const setCurrentPage = page => {
    store.dispatch({
        type: actions.SET_CURRENT_PAGE,
        payload: page
    });
}

export const setCreateStep = step => {
    store.dispatch({
        type: actions.SET_CREATE_STEP,
        payload: step
    })
}

export const generateKeypair = passphrase => {
    store.dispatch({
        type: actions.GENERATE_KEYPAIR_REQUESTED,
        payload: passphrase
    });
}