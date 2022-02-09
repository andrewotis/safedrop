import {initialStateDropfileData} from "../../initialStateDropfileData";
import {
    SET_PRIVATE_KEY_SYSTEM,
    SET_PUBLIC_KEY_SYSTEM,
    SET_PRIVATE_KEY_USER,
    SET_PUBLIC_KEY_USER,
} from "./dropFileActions";

const initialState = {
    data: initialStateDropfileData,
    keys: {
        privateKeyArmored: null,
        publicKeyArmored: null
    }
}

export default function dropFileReducer(state = initialState, action) {
    const clone = require('rfdc')()
    let newState = clone(state);

    switch (action.type) {
        case SET_PRIVATE_KEY_USER:
            newState.keys.privateKeyArmored = action.payload;
            return newState;
        case SET_PUBLIC_KEY_USER:
            newState.keys.publicKeyArmored = action.payload;
            return newState;
        default:
            return newState;
    }
}