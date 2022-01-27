import store from "../../store";

import {
    SET_PRIVATE_KEY_SYSTEM,
    SET_PUBLIC_KEY_SYSTEM,
    SET_PRIVATE_KEY_USER,
    SET_PUBLIC_KEY_USER,
} from "./dropFileActions";

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

