import rfdc from 'rfdc';
import {
    SET_LOADING, SET_PASSPHRASE, SET_AUTHENTICATED, SET_PRIVATE_KEY, SET_PUBLIC_KEY, SET_REVOKATION_CERTIFICATE, 
    SET_CURRENT_PAGE, SET_DATABASE, ADD_PASSWORD, UPDATE_PASSWORD, REMOVE_PASSWORD, UPDATE_NOTE, ADD_NOTE, REMOVE_NOTE, 
    SET_DATABASE_FILENAME, LOG_ERROR_MESSAGE, LOG_SUCCESS_MESSAGE
} from './actions';

const initialState = {
    loading: false,
    passphrase: '',
    authentiated: false,
    privateKey: null,
    publicKey: null,
    revokationCertificate: null,
    currentPage: 'Home',
    messages: [],
    errors: [],
    database: null,
    databaseFilename: '',
};
  
export default function systemReducer(state = initialState, action) {
    const clone = require('rfdc')()
    let newState = clone(state);
  
    switch (action.type) {
        case SET_LOADING:
            return {...newState, loading: action.payload};
        case LOG_ERROR_MESSAGE:
            return {...newState, errors: [...newState.errors, action.payload]};
        case LOG_SUCCESS_MESSAGE:
            return {...newState, messages: [...newState.messages,action.payoad]};
        case SET_PASSPHRASE:
            return {...newState, passphrase: action.payload};
        case SET_AUTHENTICATED:
            return {...newState, authenticated: action.payload};
        case SET_PRIVATE_KEY:
            return {...newState, privateKey: action.payload};
        case SET_PUBLIC_KEY:
            return {...newState, publicKey: action.payload};
        case SET_REVOKATION_CERTIFICATE:
            return {...newState, revokationCertificate: action.payload};
        case SET_CURRENT_PAGE:
            return {...newState, currentPage: action.payoad};
        case SET_DATABASE:
            return {...newState, database: action.payload};
        case SET_DATABASE_FILENAME:
            return {...newState, databaseFilename: action.payload};
        case UPDATE_PASSWORD:
        case REMOVE_PASSWORD:
        case ADD_PASSWORD:
        case ADD_NOTE:
        case UPDATE_NOTE:
        case REMOVE_NOTE:
        default:
            return newState;
    }
}
