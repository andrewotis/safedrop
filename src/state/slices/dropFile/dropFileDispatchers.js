import store from "../../store";

import {
    SET_PRIVATE_KEY_SYSTEM,
    SET_PUBLIC_KEY_SYSTEM,
    SET_PRIVATE_KEY_USER,
    SET_PUBLIC_KEY_USER,
    SET_DROPFILE,
    ADD_PASSWORD, ADD_CATEGORY, DELETE_CATEGORY,
} from "./dropFileActions";

export const addPassword = passwordObj => {
    store.dispatch({
       type: ADD_PASSWORD,
       payload: passwordObj
    });
}

export const addCategory = category => {
    store.dispatch({
        type: ADD_CATEGORY,
        payload: category
    });
}

export const deleteCategory = category => {
    store.dispatch({
        type: DELETE_CATEGORY,
        payload: category
    });
}




export const setDropfile = dropFile => {
    store.dispatch({
        type: SET_DROPFILE,
        payload: dropFile
    });
}

const setPrivateKeySystem = key => {
    store.dispatch({
        type: SET_PRIVATE_KEY_SYSTEM,
        payload: key
    })
}

const setPublicKeySystem = key => {
    store.dispatch({
        type: SET_PUBLIC_KEY_SYSTEM,
        payload: key
    })
}

const setPrivateKeyUser = key => {
    store.dispatch({
        type: SET_PRIVATE_KEY_USER,
        payload: key
    })
}

const setPublicKeyUser = key => {
    store.dispatch({
        type: SET_PUBLIC_KEY_USER,
        payload: key
    })
}

