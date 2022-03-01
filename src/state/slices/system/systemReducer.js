import {
    SET_LOADING, SET_AUTHENTICATED, ADD_PASSWORD, UPDATE_PASSWORD, REMOVE_PASSWORD, UPDATE_NOTE, ADD_NOTE,
    REMOVE_NOTE, LOG_MESSAGE, DISMISS_LOG_MESSAGE, SET_CREATE_STEP, SET_CURRENT_PAGE
} from './systemActions.js';

const initialState = {
    loading: false,
    authenticated: false,
    currentPage: 'Authenticate',
    log: [],
    createStep: null,
    fileHandle: null,
    unsavedDropfile: null,
};
  
export default function systemReducer(state = initialState, action) {
    const clone = require('rfdc')();
    let newState = clone(state);
  
    switch (action.type) {
        case SET_LOADING:
            newState.loading = action.payload;
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
        case SET_CURRENT_PAGE:
            newState.currentPage = action.payload;
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
}
