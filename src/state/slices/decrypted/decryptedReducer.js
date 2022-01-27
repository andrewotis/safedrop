import { initialStateDropfileData } from "../../initialStateDropfileData";
import {
    SET_LOADING
} from '../../actions';

const initialState = {
    data: initialStateDropfileData
}

export default function decryptedReducer(state = initialState, action) {
    const clone = require('rfdc')()
    let newState = clone(state);

    switch (action.type) {
        case SET_LOADING:
            newState.loading = action.payload;
            return newState;
        default:
            return newState;
    }
}