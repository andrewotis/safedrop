import {initialStateDropfileData} from "../../initialStateDropfileData";
import {
    SET_PRIVATE_KEY_USER,
    SET_PUBLIC_KEY_USER,
    SET_DROPFILE,
    ADD_PASSWORD,
    ADD_CATEGORY, DELETE_CATEGORY,
} from "./dropFileActions";

const initialState = {
    data: initialStateDropfileData,
    keys: {
        privateKeyArmored: null,
        publicKeyArmored: null,
        revocationCertificate: null
    }
}

export default function dropFileReducer(state = initialState, action) {
    const clone = require('rfdc')()
    let newState = clone(state);

    switch (action.type) {
        case ADD_PASSWORD:
            newState.data.passwords = [...newState.data.passwords, action.payload];
            return newState;
        case SET_DROPFILE:
            newState = action.payload;
            return newState;
        case SET_PRIVATE_KEY_USER:
            newState.keys.privateKeyArmored = action.payload;
            return newState;
        case SET_PUBLIC_KEY_USER:
            newState.keys.publicKeyArmored = action.payload;
            return newState;
        case ADD_CATEGORY:
            newState.data.settings.passwordCategories = [...newState.data.settings.passwordCategories, action.payload];
            return newState;
        case DELETE_CATEGORY:
            newState.data.settings.passwordCategories = newState.data.settings.passwordCategories.filter(category => category !== action.payload);
            return newState
        default:
            return newState;
    }
}