import store from "../../store";
import {
    SET_LOADING,
    DISMISS_LOG_MESSAGE,
    SET_CURRENT_PAGE,
    SET_CREATE_STEP, LOG_MESSAGE, SET_AUTHENTICATED,
} from "./systemActions";

export const setLoading = status => {
    store.dispatch({
        type: SET_LOADING,
        payload: status
    });
}

export const setAuthenticated = status => {
    store.dispatch({
        type: SET_AUTHENTICATED,
        payload: status
    });
}

export const dismissLogMessage = msg => {
    store.dispatch({
        type: DISMISS_LOG_MESSAGE,
        payload: msg
    })
}

export const setCurrentPage = page => {
    store.dispatch({
        type: SET_CURRENT_PAGE,
        payload: page
    });
}

export const setCreateStep = step => {
    store.dispatch({
        type: SET_CREATE_STEP,
        payload: step
    });
}

export const logMessage = msg => {
    store.dispatch({
        type: LOG_MESSAGE,
        payload: msg
    });
}