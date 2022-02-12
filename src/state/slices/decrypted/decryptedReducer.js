// import { initialStateDropfileData } from "../../initialStateDropfileData";


export default function decryptedReducer(state = {}, action) {
    const clone = require('rfdc')()
    let newState = clone(state);

    switch (action.type) {
        default:
            return newState;
    }
}