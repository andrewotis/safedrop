import {
    SET_LOADING, SET_AUTHENTICATED, SET_PRIVATE_KEY, SET_PUBLIC_KEY, SET_REVOKATION_CERTIFICATE, 
    SET_CURRENT_PAGE, SET_DROPFILE, ADD_PASSWORD, UPDATE_PASSWORD, REMOVE_PASSWORD, UPDATE_NOTE, ADD_NOTE, 
    REMOVE_NOTE, LOG_MESSAGE, DISMISS_LOG_MESSAGE, SET_CREATE_STEP, SET_UNSAVED_FILE, SET_ACTIVE_PASSWORD_COPY
} from './actions';
import { initialStateDropfileData } from "./initialStateDropfileData";

const initialState = {
    loading: false,
    activePasswordCopy: false,
    authenticated: false,
    currentPage: 'AuthOrCreate',
    log: [],
    createStep: null,
    unsavedDropFile: false,
    dropFile: {
        data: initialStateDropfileData,
        fileName: null,
        keys: {
            privateKeyArmored: null,
            publicKeyArmored: null,
            revokationCertificate: null
        }
    }
};
  
export default function systemReducer(state = initialState, action) {
    const clone = require('rfdc')()
    let newState = clone(state);
  
    switch (action.type) {
        case SET_LOADING:
            newState.loading = action.payload;
            return newState;
        case SET_ACTIVE_PASSWORD_COPY:
            newState.activePasswordCopy = action.payload;
            return newState;
        case SET_UNSAVED_FILE:
            newState.unsavedDropFile = action.payload;
            return newState;
        case SET_CREATE_STEP:
            newState.createStep = action.payload;
            return newState;
        case LOG_MESSAGE:
            newState.log.push(action.payload);
            return newState;
        case DISMISS_LOG_MESSAGE:
            newState.log = state.log.filter(msg => msg !== action.payload);
            return newState;
        case SET_AUTHENTICATED:
            newState.authenticated = action.payload;
            return newState;
        case SET_PRIVATE_KEY:
            newState.dropFile.keys.privateKeyArmored = action.payload;
            return newState;
        case SET_PUBLIC_KEY:
            newState.dropFile.keys.publicKeyArmored = action.payload;
            return newState;
        case SET_REVOKATION_CERTIFICATE:
            newState.dropFile.keys.revokationCertificate = action.payload;
            return newState;
        case SET_CURRENT_PAGE:
            newState.currentPage = action.payload;
            return newState;
        case SET_DROPFILE:
            newState.dropFile.keys = action.payload.keys;
            newState.dropFile.fileName = action.payload.filename;
            newState.dropFile.data = action.payload.data;
            return newState;
        case UPDATE_PASSWORD:
        case REMOVE_PASSWORD:
        case ADD_PASSWORD:
        case ADD_NOTE:
        case UPDATE_NOTE:
        case REMOVE_NOTE:
        default:
            return newState;
    }
    return newState;
}
