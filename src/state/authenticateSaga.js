import { call, put, takeEvery } from 'redux-saga/effects';
import {
    VERIFY_PASSPHRASE_REQUESTED,
    LOG_MESSAGE,
    SET_LOADING,
    SET_AUTHENTICATED,
    SET_CURRENT_PAGE
} from './actions';
import * as utilities from './../utilities';

function* authenticate(action) {
    yield put({ type: SET_LOADING, payload: true });
    try { 
        const verified = yield call(() => utilities.verifyPassphrase(action.payload.key, action.payload.passphrase));
        
        if(verified) {
            yield put({type: SET_AUTHENTICATED, payload: true});
            yield put({type: LOG_MESSAGE, payload: { type: 'success', message: 'Passphrase has been verified successfully!' } });
            yield put({type: SET_CURRENT_PAGE, payload: "Home"});
        } else {
            yield put({ type: LOG_MESSAGE, payload: { type: 'error', message: 'Problem verifying signature. Please try again.'}})
        }        
    } catch (e) {
        yield put({type: LOG_MESSAGE, payload: { type: 'error', message: e.message } });
    }
    yield put({type: SET_LOADING, payload: false});
}

function* authenticateSaga() {
  yield takeEvery(VERIFY_PASSPHRASE_REQUESTED, authenticate);
}

export default authenticateSaga;
