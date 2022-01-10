import store from './store';

export const setLoading = (status) => {
    store.dispatch({
        type: "SET_LOADING",
        payload: status
    });
}

export const setDbFile = fileContents => {
    store.dispatch({
        type: "SET_DATABASE",
        payload: fileContents
    });
}

export const logErrorMessage = msg => {
    store.dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: {
            type: 'success',
            message: msg
        }
    });
}

export const logSuccessMessage = msg => {
    store.dispatch({
        type: "LOG_SUCCESS_MESSAGE",
        payload: {
            type: 'success',
            message: msg
        }
    });
}