import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
    GENERATE_KEYPAIR_REQUESTED,
    LOG_MESSAGE,
    SET_LOADING, SET_PUBLIC_KEY, SET_REVOKATION_CERTIFICATE, SET_PRIVATE_KEY, SET_CREATE_STEP
} from "../actions";
import * as utilities from '../../utilities';

function* generate(action) {
    yield put({ type: SET_LOADING, payload: true });
    try {
        const { privateKey, publicKey, revokationCertificate } = yield call(() => utilities.generateKeypair(action.payload));

        yield put({type: SET_REVOKATION_CERTIFICATE, payload: revokationCertificate });
        yield put({type: SET_PUBLIC_KEY, payload: publicKey });
        yield put({type: SET_PRIVATE_KEY, payload: privateKey });
        yield put({type: SET_CREATE_STEP, payload: 4 });

    } catch (e) {
        yield put({type: LOG_MESSAGE, payload: { type: 'error', message: e.message } });
    }
    yield put({type: SET_LOADING, payload: false});
}

function* generateKeypairSaga() {
    yield takeEvery(GENERATE_KEYPAIR_REQUESTED, generate);
}

export default generateKeypairSaga;