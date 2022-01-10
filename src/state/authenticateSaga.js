import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    VERIFY_PASSPHRASE_REQUESTED,
    LOG_ERROR_MESSAGE,
    LOG_SUCCESS_MESSAGE,
    SET_LOADING
} from './actions';
import * as utilities from './../utilities';

function* authenticate(action) {
    yield put({type: SET_LOADING, status: true});
    try {
        const verified = yield call(() => utilities.verifyPassphrase(action.payload.privateKeyArmored, action.payload.passphrase));
        console.log('in the authenticateSaga. passphrase verified?', verified);
        if(verified) {
            // do the dispatch for verified success
        } else {
            // do the thing for when it fails
        }
        yield put({type: LOG_SUCCESS_MESSAGE, payload: 'Passphrase has been verified successfully!'});
    } catch (e) {
        yield put({type: LOG_ERROR_MESSAGE, message: e.message});
    }
    yield put({type: SET_LOADING, status: false});
}

function* authenticateSaga() {
  yield takeEvery(VERIFY_PASSPHRASE_REQUESTED, fetchItems);
}

export default authenticateSaga;
